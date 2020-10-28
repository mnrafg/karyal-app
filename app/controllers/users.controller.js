const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const isUnique = require("../utils/is-unique");
const { getFileUploadPath } = require("../utils/fileupload");
const userValidator = require("../validators/user-validator");
const createValidationErrorResponse = require("../utils/create-validation-err-response");

exports.getUsers = () => async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "photo",
        "createdAt",
      ],
    });

    res.json({ status: "success", data: users });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.createUser = () => async (req, res) => {
  try {
    const { fields, files } = req.form;
    const result = userValidator(fields);
    const usersAvatarsDir = "/public/users";

    if (result.error) {
      // console.log("Error Details:", result.error.details);
      return res.json(createValidationErrorResponse(result.error));
    }

    if (!(await isUnique(User, "email", fields.email))) {
      return res.json({
        status: "failure",
        data: { errors: { email: "Email is already registered" } },
      });
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(fields.password, salt);
    const filePath = getFileUploadPath(files.photo.name, usersAvatarsDir);
    const userData = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      photo: `/users/${filePath.name}`,
      password: hash,
    };

    fs.renameSync(files.photo.path, filePath.path);

    const user = await User.create(userData);

    res.json({ status: "success", data: user.toJSON() });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.deleteUser = () => async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "photo",
        "createdAt",
        "updatedAt",
      ],
    });

    const photo = user.photo.replace(/\/(users)\//, "storage/app/public/$1/");

    await user.destroy();
    const photoPath = path.resolve("./", photo);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    res.json({ status: "success", data: user });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};
