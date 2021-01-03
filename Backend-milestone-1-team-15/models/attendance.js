const mongoose = require("mongoose");
const timeschema = new mongoose.Schema({
  hours: {
    type: Number,
    required: true,
    default: 0,
  },
  minutes: {
    type: Number,
    required: true,
    default: 0,
  },
  secounds: {
    type: Number,
    required: true,
    default: 0,
  },
});
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay();
const attendanceschema = new mongoose.Schema({
  signin: timeschema,
  signout: timeschema,
  day: {
    type: Number,
    required: true,
    default: new Date().getDay(),

    default: new Date().getDay(),
    default: new Date().getDay(),
  },
  attnded: {
    type: Boolean,
    default: false,
  },

  month: {
    type: Number,
    required: true,
    default: new Date().getMonth() + 1,
  },
  year: {
    type: Number,
    required: true,
    default: new Date().getFullYear(),
  },
  date: {
    type: String,
    default: date,
  },

  realday: {
    type: Number,
    default: new Date().getDate(),
  },

  // days: {
  //   type: Array,
  // },
});

module.exports.model = mongoose.model("attendance", attendanceschema);
module.exports.schema = attendanceschema;
