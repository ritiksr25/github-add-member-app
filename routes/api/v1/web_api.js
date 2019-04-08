const express = require('express');
const router = express.Router();

const apiController = require('../../../controllers/api_controller');

router.get('/team', apiController.team);

router.get('/events', apiController.events);

router.get('/index', apiController.index);

router.get('/about', apiController.about);

module.exports = router;