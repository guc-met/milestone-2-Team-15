const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slotLinkingRequestSchema = new schema({
    
    academicID: String,
    slotid: String,
    coorname: String ,
    state:String,
    slot:Number,
    coursecode:String
})
module.exports = mongoose.model('slotLinking',slotLinkingRequestSchema);