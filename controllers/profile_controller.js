const Profile = require('../models/Profile');

module.exports.index = (req, res) => {
    return res.render('index', {message: ''});
};

module.exports.register = (req, res) => {
    Profile.findOne({email: req.body.email}, (err, profile) => {
        if(err) {
            return res.render('index', {message: 'try again'});
        }
        if(profile) {
            return res.render('index', {message:'already registered'});
        }
        Profile.create(req.body, (err, done) => {
            if(err) {
                return res.render('index', {message:'try again'});
            }
            return res.render('index', {message:'success'});
        });
    });
};