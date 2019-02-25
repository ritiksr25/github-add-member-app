const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/', profileController.index );

router.post('/', profileController.register );

// router.get('/testdsckiet', profileController.test);

module.exports = router;