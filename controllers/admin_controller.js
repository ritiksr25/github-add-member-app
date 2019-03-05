require('dotenv').config();

module.exports.approve_github = (req, res) => {
    return res.render('index', {message: ''});
};

module.exports.generate_attendee_id = (req, res) => {
    if (req.user) {
        let idnum = String(req.params.id).slice(20, 24).toUpperCase();
        Workshop.updateOne({_id: req.params.id}, {status: 1, attendeeId: 'DSC-' + idnum}, (err, updated) => {
            if (err) return res.render('workshop_list', {message: 'error', candidates: ''});
            res.redirect('/admin/dashboard');
        });
    } else {
        console.log('not auth');
        return res.render('workshop_list', {message: 'not authenticated', candidates: ''});
    }
};

module.exports.approve_workshop = (req, res) => {
    if (req.user) {
        Workshop.find({}, (err, candidates) => {
            if (err) return res.render('workshop_list', {message: 'error', candidates: ''});
            res.render('workshop_list', {message: '', candidates});
        });
    } else {
        console.log('not auth');
        return res.render('workshop_list', {message: 'not authenticated', candidates: ''});
    }
};

module.exports.attendees_info = (req, res) => {
    if(req.params.gId === process.env.GOOGLE_ID) {
        Workshop.find({status: 1}, (err, attendees) => {
            if (err) return res.status(404).json({message: 'error', attendees: []});
            return res.json({message: 'success', attendees})
        });
    } else{
        return res.status(200).json({message: 'not authenticated', attendees: []});
    }
};

module.exports.mark_event_attendance = (req, res) => {
    if(req.params.gId === process.env.GOOGLE_ID) {
        Workshop.updateOne({attendeeId: req.body.attendeeId, status: 1}, {status: 2}, (err, updated) => {
            if (err) return res.status(404).json({message: 'error'});
            if (updated.n === 1) return res.json({message: 'success'});
            else {
                Workshop.findOne({attendeeId: req.body.attendeeId}, (err, attendee) => {
                    if (err) return res.status(404).json({message: 'error'});
                    if (attendee) {
                        if (attendee.status === 2) return res.json({message: 'already marked'});
                        else return res.json({message: 'failure'});
                    } else {
                        return res.json({message: 'not registered'});
                    }
                });
            }
        });
    } else{
        return res.status(200).json({message: 'not authenticated'});
    }
};