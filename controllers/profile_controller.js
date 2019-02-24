const request = require('request');
require('dotenv').config();
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
            let customHeaderRequest = request.defaults({
                headers: {'User-Agent': 'request'}
            });
            let token = process.env.GITHUB_TOKEN;
            let url = "https://api.github.com/orgs/dsckiet/memberships/" + req.body.github + "?access_token=" + token;
            customHeaderRequest
                .put(url)
                .on('error', (err) => {
                    console.log(err)
                    return res.render('index', {message:'try again'});
                })
                .on('response', (response) => {
                    console.log(response.statusCode);
                    return res.render('index', {message:'success'});
                });
        });
    });
};