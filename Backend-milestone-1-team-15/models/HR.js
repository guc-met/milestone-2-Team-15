const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);
const attendanceschema = require("./attendance");
const monthschema = require("./month");
const HRSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },

  salary: {
    type: mongoose.Decimal128,
    required: true,
  },
  dayOff: Number,
  ID: String,
  locationID: {
    type: Number,
    required: true,
  },
});

HRSchema.plugin(autoIncrement.plugin, {
  model: "HR",
  field: "id",
  startAt: 1,
});
module.exports = mongoose.model("HR", HRSchema);
