const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');

router.get('/github', adminController.approve_github );

router.get('/dashboard', adminController.approve_workshop );

router.get('/sendinvite', adminController.send_invite );

router.get('/workshop/:id', adminController.generate_attendee_id );

module.exports = router;