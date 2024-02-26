const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
  children: [{ type: Number, ref: "childerns" }],
});

module.exports = mongoose.model("class", classSchema);
