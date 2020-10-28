const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const isUnique = require("../utils/is-unique");
const { getFileUploadPath } = require("../utils/fileupload");
const courseValidator = require("../validators/course-validator");
const createValidationErrorResponse = require("../utils/create-validation-err-response");

exports.getCourses = () => async (req, res) => {
  try {
    const courses = await Course.findAll();

    res.json({ status: "success", data: courses });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.createCourse = () => async (req, res) => {
  try {
    const { fields, files } = req.form;
    const result = courseValidator(fields);
    const coursesThumbnailDir = "/public/courses";

    if (result.error) {
      // console.log("Error Details:", result.error.details);
      return res.json(createValidationErrorResponse(result.error));
    }

    if (!(await isUnique(Course, "title", fields.title))) {
      return res.json({
        status: "failure",
        data: { errors: { email: "A course with same title already exists" } },
      });
    }

    const filePath = getFileUploadPath(files.photo.name, coursesThumbnailDir);
    const courseData = {
      title: fields.title,
      description: fields.description,
      intro: fields.intro,
      thumbnail: `/courses/${filePath.name}`,
      icon: fields.icon,
    };

    fs.renameSync(files.photo.path, filePath.path);

    const course = await Course.create(courseData);

    res.json({ status: "success", data: course.toJSON() });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

exports.deleteCourse = () => async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({
      where: { id: courseId },
    });

    const photo = course.photo.replace(
      /\/(courses)\//,
      "storage/app/public/$1/"
    );

    await course.destroy();
    const photoPath = path.resolve("./", photo);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    res.json({ status: "success", data: course });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};
