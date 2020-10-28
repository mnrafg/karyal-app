const bcrypt = require("bcrypt");

const User = require("../models/User");
const Author = require("../models/Author");
const Course = require("../models/Course");

const sequelize = require("./database");

(async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate([
      {
        firstName: "Ahmad",
        lastName: "Afghan",
        email: "ahmad.afghan@gmail.com",
        password: bcrypt.hashSync("ahmad123", bcrypt.genSaltSync()),
        // photo: "/users/17ef9c8f0ec129b4c8fee1bbf4b817383e29828b.jpg",
        photo: "https://randomuser.me/api/portraits/men/62.jpg",
      },
      {
        firstName: "Karim",
        lastName: "Atal",
        email: "karim.atal@gmail.com",
        password: bcrypt.hashSync("karim123", bcrypt.genSaltSync()),
        // photo: "/users/9e1053e8c8b171e5aa080feea223954028fcd139.jpg",
        photo: "https://randomuser.me/api/portraits/men/37.jpg",
      },
      {
        firstName: "Salim",
        lastName: "Barai",
        email: "salim.barai@gmail.com",
        password: bcrypt.hashSync("barai321", bcrypt.genSaltSync()),
        // photo: "/users/1b3ce8531fa048f93e4af2dddea9f00e2a168187.jpg",
        photo: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ]);

    const authors = await Author.bulkCreate([
      {
        firstName: "Walid",
        lastName: "Popal",
        email: "walid.popal@gmail.com",
        password: bcrypt.hashSync("walid.popal", bcrypt.genSaltSync()),
        // photo: "/users/1bb79863e8f8b04c5c1e93076ac14e87361b5473.jpg",
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
      },
      {
        firstName: "Asad",
        lastName: "Khan",
        email: "asad.khan@gmail.com",
        password: bcrypt.hashSync("asad123", bcrypt.genSaltSync()),
        // photo: "/users/197d22c086d049ff7adbf52a4bbbfb7a69493fa1.jpg",
        photo: "https://randomuser.me/api/portraits/men/77.jpg",
      },
    ]);

    const courses = await Course.bulkCreate([
      {
        title: "Laravel Tutorial for Beginners",
        description: `Laravel is an open-source web MVC framework for PHP.
          Laravel is a robust framework that provides easy development of
          PHP web applications with features like a modular packaging
          system with a dedicated dependency manager, access to relational
          databases, and other utilities for application deployment
          and maintenance.`.replace(/\s+/g, " "),
        intro:
          "Laravel is a web application framework with expressive, elegant syntax.",
        icon: "alpha-l-circle",
        // thumbnail: "/courses/685b66a1ed6a5b6c9fdd8c61de8b2cf74f9b040a.jpg",
        thumbnail: "https://picsum.photos/id/2/300/200",
        AuthorId: authors[0].id,
      },
      {
        title: "Learn React Full Course",
        description: `React is an open-source, front end, JavaScript library for
          building user interfaces or UI components. It is maintained by
          Facebook and a community of individual developers and companies.
          React can be used as a base in the development of single-page or
          mobile applications.`.replace(/\s+/g, " "),
        intro: "A JavaScript library for building user interfaces",
        icon: "alpha-r-circle",
        // thumbnail: "/courses/7c87a1c4725f088cc73212ba8b8d349fd3f8da18.jpg",
        thumbnail: "https://picsum.photos/id/28/300/200",
        AuthorId: authors[1].id,
      },
    ]);

    console.log("%s users created successfully.", users.length);
    console.log("%s authors created successfully.", authors.length);
    console.log("%s courses created successfully.", courses.length);
  } catch (err) {
    console.log(err.message);
  }
})();
