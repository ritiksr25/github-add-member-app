const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');

router.get('/', passport.authenticate('google', {failureRedirect: '/'}), adminController.approve_github );

router.get('/dashboard',passport.authenticate('google', {failureRedirect: '/'}), adminController.approve_workshop );

router.get('/workshop/:id', passport.authenticate('google', {failureRedirect: '/'}), adminController.generate_attendee_id );

module.exports = router;