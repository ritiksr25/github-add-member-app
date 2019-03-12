const express = require('express');
const router = express.Router();

const workshopController = require('../controllers/workshop_controller');

router.get('/', workshopController.studyjam );

router.post('/', workshopController.registerstudyjam );

router.get('/cloudjamlist', workshopController.studyJamList);

router.get('/approvecloudjamattendee/:id', workshopController.approveCandidateStudyJam);

// router.get('/testdsckiet', workshopController.test);

module.exports = router;