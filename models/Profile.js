const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    github: String,
    linkedin: String,
    name: String,
    email: String,
    rollno: String,
    branch: String,
    year: String
},{
    timestamps: true
});

module.exports = Profile = mongoose.model('profile', profileSchema);
