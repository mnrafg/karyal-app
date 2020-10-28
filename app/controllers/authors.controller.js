const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const Author = require("../models/Author");
const isUnique = require("../utils/is-unique");
const { getFileUploadPath } = require("../utils/fileupload");
const userValidator = require("../validators/user-validator");
const createValidationErrorResponse = require("../utils/create-validation-err-response");

exports.getAuthors = () => async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "photo",
        "createdAt",
      ],
    });

    res.json({ status: "success", data: authors });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.createAuthor = () => async (req, res) => {
  try {
    const { fields, files } = req.form;
    const result = userValidator(fields);
    const usersAvatarsDir = "/public/authors";

    if (result.error) {
      // console.log("Error Details:", result.error.details);
      return res.json(createValidationErrorResponse(result.error));
    }

    if (!(await isUnique(Author, "email", fields.email))) {
      return res.json({
        status: "failure",
        data: { errors: { email: "Email is already registered" } },
      });
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(fields.password, salt);
    const filePath = getFileUploadPath(files.photo.name, usersAvatarsDir);
    const authorData = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      photo: `/authors/${filePath.name}`,
      password: hash,
    };

    fs.renameSync(files.photo.path, filePath.path);

    const author = await Author.create(authorData);

    res.json({ status: "success", data: author.toJSON() });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.deleteAuthor = () => async (req, res) => {
  const { authorId } = req.params;

  try {
    const author = await Author.findOne({
      where: { id: authorId },
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

    const photo = author.photo.replace(
      /\/(authors)\//,
      "storage/app/public/$1/"
    );

    await author.destroy();
    const photoPath = path.resolve("./", photo);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    res.json({ status: "success", data: author });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};
