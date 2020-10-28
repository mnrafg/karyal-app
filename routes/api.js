const jwt = require("express-jwt");
var express = require("express");
var router = express.Router();

const authenticate = require("../app/utils/authenticate");
const parseForm = require("../app/utils/parse-form");

// Controllers

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../app/controllers/users.controller");

const {
  getAuthors,
  createAuthor,
  deleteAuthor,
} = require("../app/controllers/authors.controller");

const {
  getCourses,
  createCourse,
  deleteCourse,
} = require("../app/controllers/courses.controller");

router.get("/", function (req, res) {
  // res.json({
  //   msg: "Welcome to Karyal",
  //   hostname: req.hostname,
  // });
  res.send(`<h1>Welcome to our Heroku Project!</h1>`);
});

const secret = process.env.SECRET || "secret";
router.post("/token", authenticate());
router.get("/users", jwt({ secret, algorithms: ["HS256"] }), getUsers());
router.post("/users", parseForm(), createUser());
router.delete("/users/:userId", deleteUser());

router.get("/authors", jwt({ secret, algorithms: ["HS256"] }), getAuthors());
router.post("/authors", parseForm(), createAuthor());
router.delete("/authors/:authorId", deleteAuthor());

router.get("/courses", jwt({ secret, algorithms: ["HS256"] }), getCourses());
router.post("/courses", parseForm(), createCourse());
router.delete("/courses/:courseId", deleteCourse());

module.exports = router;
