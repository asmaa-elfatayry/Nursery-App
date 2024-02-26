const { body, param, query } = require("express-validator");
exports.childArray = [
  body("fullnae").isAlpha().withMessage("enter valid fullname"),
  body("_id").isNumeric().withMessage("enter valid id number"),
  body("age").isNumeric().withMessage("enter valid age"),
  body("level").isString().withMessage("enter valid level name"),
];
