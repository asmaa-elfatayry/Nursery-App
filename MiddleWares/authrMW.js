const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);

    console.log("decoded ", decoded?.role);
    req.decoded = decoded;
    next();
  } catch (error) {
    error.message = "Unauthorized";
    error.status = 403;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.decoded);
  if (req.decoded?.role == "admin") {
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isTeacher = (req, res, next) => {
  console.log(req.decoded);
  if (req.decoded?.role == "teacher") {
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};
