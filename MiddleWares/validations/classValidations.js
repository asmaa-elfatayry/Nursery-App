const { body } = require("express-validator");

exports.classArray = [
  body("name").isString().withMessage("Enter valid class name"),
  body("supervisor").isNumeric().withMessage("Enter valid supervisor ID"),
  body("children").isArray().withMessage("Children must be an array"),
];
