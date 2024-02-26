const { body } = require("express-validator");
exports.teacherArray = [
  body("fullname").isString().withMessage("enter valid fullname"),
  body("email").isEmail().withMessage("enter valid email"),
  body("password")
    .isAlphanumeric()
    .withMessage("enter password contain numbers and letters"),
  body("image").isString().withMessage("enter valid image name"),
];
