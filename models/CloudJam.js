const mongoose = require('mongoose');

const cloudJamSchema = mongoose.Schema({
    github: String,
    name: String,
    email: String,
    expertise: String,
    branch: String,
    year: String,
    interest: String,
    workshop: {type: String, default: "cloud study jam"},
    attendeeId: {type: String, default: ""},
    status: {type: Number, default: 0} // 1:approved, 2:present
},{
    timestamps: true
});

module.exports = CloudJam = mongoose.model('cloudjam', cloudJamSchema);