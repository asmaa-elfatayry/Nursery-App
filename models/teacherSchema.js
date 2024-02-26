const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  image: String,
});

module.exports = mongoose.model("teachers", Schema);
