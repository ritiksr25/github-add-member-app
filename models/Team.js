const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: String,
    role: String,
    linkedin: String,
    photo: String,
    github: String,
    email: String,
    instagram: String,
    facebook: String,
    status:{type: Number, default: 0}
},{
    timestamps: true
});

module.exports = Team = mongoose.model('team', teamSchema);