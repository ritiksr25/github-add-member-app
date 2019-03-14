const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    image: String,
    slug: String,
    description: String,
    startDate: String,
    endDate: String,
    status:{type: Number, default: 0} // 1: show, 0: hidden
},{
    timestamps: true
});

module.exports = Event = mongoose.model('event', eventSchema);