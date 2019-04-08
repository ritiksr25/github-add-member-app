const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: String,
    role: String,
    linkedin: String,
    photo: String,
    github: String,
    email: String,
    twitter: String,
    website: String,
    status:{type: Number, default: 0} // 1:core 0:dont_add 2:community
},{
    timestamps: true
});

module.exports = Team = mongoose.model('team', teamSchema);