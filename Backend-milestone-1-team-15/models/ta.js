const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  locationID: {
    type: Number,
    required: true,
  },
  ID: {
    type: String,
    unique: true,
    required: true,
  },

  coordinator: Boolean,
  name: String,
  schedule: Array,
  //array of slots
  faculty: String,
  dayOff: Number,
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
  department: String,
  leaves: Array,
  accidentalLeaves: Number,
  replacerequests: Array,
  changereq: Array,
  linkslotreqs: Array,
});
module.exports = mongoose.model("ta", taSchema);
