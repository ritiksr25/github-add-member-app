const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin_controller');

router.get('/attendees', adminController.attendees_info );

router.post('/mark_attendance', adminController.mark_event_attendance);

module.exports = router;