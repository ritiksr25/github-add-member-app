const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    handle: String,
    name: String,
    email: String,
    rollno: String
},{
    timestamps: true
});

module.exports = Profile = mongoose.model('profile', profileSchema);
