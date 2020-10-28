const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = () => async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      status: "failure",
      message: "Email and password both are required",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    const secret = process.env.SECRET || "secret";

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, secret, {
        algorithm: "HS256",
        expiresIn: "3h",
      });

      return res.json({
        status: "success",
        data: token,
      });
    }

    res.json({
      status: "failure",
      message: `Email or password is incorrect`,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: `Error: ${error.message}`,
    });
  }
};
