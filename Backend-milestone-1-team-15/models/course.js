const { Double } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const courseSchema = new schema({
  //coordinator: Boolean, only in TA
  //coordinator: id

  TAs: Array,
  Instructors: Array,
  teachingSlots: Number,
  assignedSlots: Number,
  cover: Boolean,
  slots: Array,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: String,
  coverage: mongoose.Decimal128
});
module.exports = mongoose.model("course", courseSchema);
