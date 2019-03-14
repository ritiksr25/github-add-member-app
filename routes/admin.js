const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');
const eventController = require('../controllers/event_controller');

router.get('/github', adminController.approve_github );

router.get('/approveandroid', adminController.approve_workshop );

router.get('/dashboard', adminController.dashboard );

router.get('/signout', adminController.signout);

router.get('/sendinvite', adminController.send_invite );

router.get('/sendinvite/:id', adminController.send_invite_one );

router.get('/workshop/:id', adminController.generate_attendee_id );

router.get('/members', adminController.dscmembers );

router.get('/members/:id', adminController.dscmember );

router.get('/create-event', eventController.createEvent);

module.exports = router;