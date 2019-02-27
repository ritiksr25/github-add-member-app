const mongoose = require('mongoose');

const workshopSchema = mongoose.Schema({
    github: String,
    name: String,
    email: String,
    rollno: String,
    branch: String,
    year: String,
    workshop: String,
    attendeeId: {type: String, default: ""},
    status: {type: Number, default: 0}
},{
    timestamps: true
});

module.exports = Workshop = mongoose.model('workshop', workshopSchema);