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
  courseName: {
    type: String,
    required: true,
  },
  assigned: {
    type: Boolean,
    default: true,
  },
  code: String,
  coverage: mongoose.Decimal128,
});

const departmentSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  assigned: {
    type: Boolean,
    default: true,
  },
  HeadOfDepartmentID: String,
  courses: [
    {
      type: courseSchema,
      sparse: true,
      index: true,
    },
  ],
});

const facultySchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  assigned: {
    type: Boolean,
    default: true,
  },
  departments: [
    {
      type: departmentSchema,
      sparse: true,
      index: true,
    },
  ],
});

module.exports.faculty = mongoose.model("faculty", facultySchema);
module.exports.departmentSchema = departmentSchema;
module.exports.courseSchema = courseSchema;
