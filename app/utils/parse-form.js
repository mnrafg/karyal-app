const path = require("path");
const formidable = require("formidable");

const formidableDefaultOptions = {
  multiples: false,
  uploadDir: path.resolve("./storage/temp"),
};

module.exports = (options = {}) => (req, res, next) => {
  const settings = Object.assign(formidableDefaultOptions, options);
  const form = formidable(settings);

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({ status: "failure", message: err.message });
    }

    req.form = { fields, files };
    next();
  });
};
