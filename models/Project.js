const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    repository: Array,
    title: String,
    description: String,
    lead: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    members: [{profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}}],
    stack: Array,
    startDate: String,
    endDate: String,
    priority: {type: Number, default: 0}, // 1: important, 0: not yet initialized, 2: low importance, 9: urgent
    status:{type: Number, default: 0} // 1: completed, 2: beta, 3: terminated, 4: problems, 0: not yet initialized
},{
    timestamps: true
});

module.exports = Project = mongoose.model('project', projectSchema);