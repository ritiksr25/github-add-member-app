const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    title: String,
    image: String,
    slug: String,
    description: String,
    status: {type: Number, default: 0} // 1: showcase
}, {
    timestamps: true
});

module.exports = Story = mongoose.model('story', storySchema);