const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slotSchema = new schema({
    kind: String,
    academicMember: String,
    timing: String,
    courseCode: String,
    location: String   
})
module.exports = mongoose.model('slot',slotSchema);