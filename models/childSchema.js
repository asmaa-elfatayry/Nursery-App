const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  _id: { type: Number, required: true },
  fullname: String,
  age: Number,
  level: { type: String, enum: ["PreKG", "KG1", "KG2"] },
  address: {
    city: String,
    street: String,
    building: String,
  },
  image: String,
});

module.exports = mongoose.model("childerns", Schema); // name of collection + schema
