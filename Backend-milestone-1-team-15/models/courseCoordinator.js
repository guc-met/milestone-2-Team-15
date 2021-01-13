const mongoose = require("mongoose");
const schema = mongoose.Schema;
const courseCoordinatorSchema = new schema({
  //coordinator: Boolean, only in TA
  courses: Array,
  name: String,
  schedule: Array,
  email: {
    type: String,
    unique: true,
    required: true,
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

  //array of slots
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
  faculty: String,
  changereq: Array,
  linkslotreqs: Array,
});

module.exports = mongoose.model("courseCoordinator", courseCoordinatorSchema);
module.exports = mongoose.model("courseCoordinator", courseCoordinatorSchema);

// model is identical to instructor model
// model is identical to instructor model
