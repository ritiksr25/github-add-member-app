const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    github: String,
    linkedin: String,
    name: String,
    email: String,
    rollno: String,
    branch: String,
    year: String,
    status:{type: Number, default: 0}
},{
    timestamps: true
});

module.exports = Profile = mongoose.model('profile', profileSchema);