const request = require('request');
require('dotenv').config();
const Profile = require('../models/Profile');

module.exports.approve_github = (req, res) => {
    return res.render('index', {message: ''});
};

module.exports.generate_attendee_id = (req, res) => {
    if (req.user) {
        let idnum = String(req.params.id).slice(20,24).toUpperCase();
        Workshop.updateOne({_id: req.params.id}, {status: 1, attendeeId: 'DSC-' + idnum}, (err, updated) => {
            if(err) return res.render('workshop_list', {message: 'error', candidates: ''});
            res.redirect('/admin/dashboard');
        });
    } else {
        console.log('not auth');
        return res.render('workshop_list', {message: 'not authenticated', candidates: ''});
    }
};

module.exports.approve_workshop = (req, res) => {
    if (req.user) {
        Workshop.find({}, (err, candidates) => {
            if (err) return res.render('workshop_list', {message: 'error', candidates: ''});
            res.render('workshop_list', {message: '', candidates});
        });
    } else {
        console.log('not auth');
        return res.render('workshop_list', {message: 'not authenticated', candidates: ''});
    }
};