const mongoose = require("mongoose");
const schema = mongoose.Schema;
require("dotenv").config();
autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const locationSchema = new schema({
  roomKind: {
    type: String,
    required: true,
  },
  NumberOfPersons: {
    type: Number,
    required: true,
  },
  NumberOfAvailablePeople: {
    type: Number,
    required: true,
  },
  FloorNumber: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  BuildingCharachter: {
    type: String,
    required: true,
  },
});
locationSchema.plugin(autoIncrement.plugin, {
  model: "location",
  field: "locationId",
  startAt: 1,
});
module.exports = mongoose.model("locations", locationSchema);
