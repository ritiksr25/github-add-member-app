require('dotenv').config();
const Workshop = require('../models/Workshop');

module.exports.index = (req, res) => {
    return res.render('workshop', {message: ''});
};

module.exports.register = (req, res) => {
    console.log(req.body);
    if(req.body.email == '' || req.body.email == null || req.body.github == '' || req.body.github == null || req.body.rollno == '' || req.body.rollno == null || req.body.year == '' || req.body.year == null || req.body.branch == '' || req.body.branch == null) {
        return res.render('workshop', {message: 'invalid details'});
    } else {
        Workshop.findOne({email: req.body.email}, (err, workshop) => {
            if (err) {
                return res.render('workshop', {message: 'try again'});
            }
            if (workshop) {
                return res.render('workshop', {message: 'already registered'});
            }
            Workshop.create(req.body, (err, done) => {
                if (err) {
                    return res.render('workshop', {message: 'try again'});
                }
                return res.render('workshop', {message: 'success'});
            });
        });
    }
};

module.exports.studyjam = (req, res) => {
    res.render("studyjam", {message: ''});
};

module.exports.registerstudyjam = (req, res) => {

};