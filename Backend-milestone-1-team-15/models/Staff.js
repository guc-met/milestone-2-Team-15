const mongoose = require("mongoose")
const attendance = require("./attendance")
const attendanceschema = attendance.schema

const monthschema = new mongoose.Schema({
  attendance: { type: [ attendanceschema ], default: new Array(31) },
})

const staffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    //required: true,
  },
  firstPassEntered: {
    type: Boolean,
    default: false,
  },

  ID: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  months: {
    type: [monthschema],
    default: new Array(13),
  },
  missingdays: {
    type: Array,
  },
  missinghours: {
    type: Number,
    default:0,
  },
  extrahours: {
    type: Number,
    default: 0,
  },
  acceptedleaves: {
    type: Array,
  },
  acceptedannual: {
    type: Number,
  },
})
module.exports = mongoose.model("Staff", staffSchema)
