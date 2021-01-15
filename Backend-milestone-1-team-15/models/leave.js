const mongoose = require("mongoose");
const schema = mongoose.Schema;
const leaveSchema = new schema({
  smail: { type: String, required: true },
  rmail: {
    type: String,
  },
  name: String,
  replacementName: String,
  requesterid: String,
  replacmentid: String,
  replacmentAcceptance: String,
  slotnumber: Number,
  leaveType: String,
  state: String,
  HoDname: String,
  comment: String,
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  realday: {
    type: Number,
  },
});
module.exports = mongoose.model("leave", leaveSchema);
