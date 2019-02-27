const express = require('express');
const router = express.Router();

const workshopController = require('../controllers/workshop_controller');

router.get('/', workshopController.index );

router.post('/', workshopController.register );

module.exports = router;