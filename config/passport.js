const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
                proxy: true
            },
            function(accessToken, refreshToken, profile, done) {
                const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
                const newAdmin = {
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: image
                }

                //check for existing user
                Admin.findOne({
                    googleID: profile.id
                }).then(admin => {
                    if (admin) {
                        if(admin.googleID == process.env.GOOGLE_ID) done(null, admin);
                        else done(null)
                    } else {
                        new Admin(newAdmin).save().then(admin => {
                            if(admin.googleID == process.env.GOOGLE_ID) done(null, admin);
                            else done(null)
                        });
                    }
                });
            }
        ));
    passport.serializeUser((admin, done) => {
        done(null, admin.id);
    });
    passport.deserializeUser((id, done) => {
        Admin.findById(id).then(admin => done(null, admin));
    });
}