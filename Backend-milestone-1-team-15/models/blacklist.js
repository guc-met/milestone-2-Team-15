const mongoose = require("mongoose");

const blacklist = new mongoose.Schema({
  token: {
    type :String,
  }
 
})

module.exports = mongoose.model("blacklist", blacklist);

