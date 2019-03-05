const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin_controller');

router.get('/attendees/:gId', adminController.attendees_info );

router.post('/mark_attendance/:gId', adminController.mark_event_attendance);

module.exports = router;