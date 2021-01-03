const mongoose = require('mongoose');
const schema = mongoose.Schema;
const changedaySchema = new schema({
    
    smail: {type: String, 
        required: true
        },
    name: String,
    day: Number,
    state: String,
    HoDname: String,
    comment: String  
})
module.exports = mongoose.model('changeday',changedaySchema);
