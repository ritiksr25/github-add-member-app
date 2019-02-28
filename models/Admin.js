const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    googleID: { type: String, required: true },
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    image: String
});

module.exports = Admin = mongoose.model('admin', AdminSchema);