const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("./../models/teacherSchema");

exports.login = async (req, res, next) => {
  try {
    const { fullname, password } = req.body;
    let role = "";
    let user, token;

    //  if the username 'admin'
    if (fullname === "admin" && password === "6372gecy") {
      role = "admin";
      token = jwt.sign(
        { fullname: "admin", role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "admin login", token });
    } else {
      user = await Teacher.findOne({ fullname });

      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await Teacher.create({ fullname, password: hashedPassword });
      }

      // Generate JWT token for teacher
      role = "teacher";
      token = jwt.sign(
        { fullname: user.fullname, role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    next(error);
  }
};
