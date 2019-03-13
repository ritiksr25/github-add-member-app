const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');

router.get('/github', adminController.approve_github );

router.get('/approveandroid', adminController.approve_workshop );

router.get('/dashboard', adminController.dashboard );

router.get('/sendinvite', adminController.send_invite );

router.get('/workshop/:id', adminController.generate_attendee_id );

router.get('/members', adminController.dscmembers );

module.exports = router;