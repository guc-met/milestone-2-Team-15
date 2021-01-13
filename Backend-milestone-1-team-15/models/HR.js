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
  missingDays: Number,
  mustAttendHours: Number,
  attendedHours: Number,
  signinTime: Number,
  signoutTime: Number,
  signIn: Boolean,
  signOut: Boolean,
  salary: mongoose.Decimal128,
  deduction: mongoose.Decimal128,
  gender: String,
  leaveBalance: mongoose.Decimal128, //add 2.5 every month
  changereq: Array,
  leaves: Array,
  accidentalLeaves: Number,
  linkslotreqs: Array,
});

HRSchema.plugin(autoIncrement.plugin, {
  model: "HR",
  field: "id",
  startAt: 1,
});
module.exports = mongoose.model("HR", HRSchema);
