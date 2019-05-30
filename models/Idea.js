const mongoose = require('mongoose');

const IdeasSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    technology: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {type: Number, default: 1}
})

module.exports = Idea = mongoose.model('Idea', IdeasSchema);