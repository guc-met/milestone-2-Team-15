const mongoose = require("mongoose")
const attendance = require("./attendance")
const attendanceschema = attendance.schema

const monthschema = new mongoose.Schema({
  attendance: [{ type: attendanceschema }],
})

module.exports = mongoose.model("monthschema", monthschema)
