const mongoose = require("mongoose");
const schema = mongoose.Schema;
const courseSchema = require("./course");

const departmentSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  HeadOfDepartmentID: String,
  courses: Array//[
    //{
    //  type: courseSchema,
   // },
  //],
});

module.exports = mongoose.model("department", departmentSchema);
