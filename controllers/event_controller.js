require('dotenv').config();
const Event = require('../models/Event');

module.exports.createEvent = (req, res) => {
    return res.render('createEvent', {message: ''});
};
