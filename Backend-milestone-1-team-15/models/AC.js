const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);
const ACSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
ACSchema.plugin(autoIncrement.plugin, {
  model: "AcademicMember",
  field: "ID",
  startAt: 1,
});
module.exports = mongoose.model("AcademicMember", ACSchema);
