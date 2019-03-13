require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.approve_github = (req, res) => {
    return res.render('index', {message: ''});
};

module.exports.dashboard = (req, res) => {
    if(req.user) {
        res.render('dashboard');
    } else{
        res.redirect('/');
    }
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

function generate_html(name, attId) {
    let html = "<table style=\"width:100%;background-color:#e6e6e6a6;padding:15px; font-family:sans-serif\"> <tbody> <tr> <td style=\"width:100%\"> <table style=\"width:550px;margin:0 auto;background-color:white;border-radius:5px;padding:25px; border-top: 4px solid #3F76E0;\"> <tbody> <tr> <td> <p>Hi " + name + "</p><p>Here's your <strong>ENTRY PASS</strong> for attending <strong>Bootcamp on Android Development</strong>. Please be on time!</p><div style=\"text-align:center\"> </div><div> <h1 class=\"m_-7785044327932819869text-center;\">Bootcamp on Android Development</h1> <div style=\"border:1px dotted grey;background-color:#3f76e0;color:white;text-align:center;padding-bottom:10px\"> <p>Your Unique Code</p><h1>" + attId +"</h1> <small>*This code will be required to gain entry!</small> </div><div> <div> <p style=\"background-color:grey;padding:5px;color:white\"> <strong> Schedule: </strong> <span> <span> <span>Thrusday, 07-Mar-2019</span> <span class=\"m_-7785044327932819869badge m_-7785044327932819869badge-secondary m_-7785044327932819869badge-pill\"> 05:00 PM To 07:00 PM</span> </span> </span> </p></div></div><div style=\"border-bottom:1px dotted grey;border-top:1px dotted grey;padding:5px 0\"> <p><strong>Venue Details: </strong></p><div> <p style=\"margin:3px\">CSE Lab 2, CSE Department, 5th-floor E-Block, KIET Group of Institutions </p></div></div><hr> <div class=\"m_-7785044327932819869margin: m_-778504432793281986910px m_-77850443279328198690; m_-7785044327932819869text-align: m_-7785044327932819869center;\"> <div style=\"width:100px;margin:16px auto 0 auto\"> <a href=\"https://dsckiet.github.io/\"> <img alt=\"DSC Logo\" src=\"https://dsckiet.github.io/assets/img/dsclogo.png\" class=\"CToWUd\" width=\"100%\"> </a> </div></div></div></td></tr></tbody></table> </td></tr><tr> <td> <footer style=\"text-align:center;color:#656565;margin-top:15px\"> <a href=\"https://dsckiet.github.io/\" style=\"text-decoration:none;color:#e64d8a\" target=\"_blank\"> Developer Student Clubs | <strong>dsckiet@gmail.com</strong> </a> </footer> </td></tr></tbody> </table>";
    return html;
};

module.exports.send_invite = (req, res) => {
  if(req.user) {
    Workshop.find({status: 1}, (err, attendees) => {
        if(err) throw err;
        attendees.forEach((attendee) => {
            let html = generate_html(attendee.name, attendee.attendeeId);
            const message = {
                to: attendee.email,
                from: { email: "dsckiet@gmail.com", name: "DSC KIET" },
                message: "You have been registered for Science Quiz 2019",
                subject: "[DSC] Entry code for Android Bootcamp",
                html: html
            };
            sgMail
                .send(message)
                .then(sent => {
                    console.log("sent")
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
  } else{
    done(null);
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

module.exports.dscmembers = (req, res) => {
    if(req.user) {
        Profile.find({}, (err, members) => {
            if(err) res.render('dscMembers', {message: 'error', members: ''});
            return res.render('dscMembers', {message: '', members: members});
        });
    } else{
        res.redirect('/');
    }
};

module.exports.dscmember = (req, res) => {
    if (req.user) {
        Profile.updateOne({_id: req.params.id}, {status: 1}, (err, updated) => {
           if(err) throw err;
           if(updated) {
               Profile.findOne({_id: req.params.id, status: 1}, (err, profile) => {
                   let customHeaderRequest = request.defaults({
                       headers: {'User-Agent': 'request'}
                   });
                   let token = process.env.GITHUB_TOKEN;
                   let url = "https://api.github.com/orgs/dsckiet/memberships/" + profile.github + "?access_token=" + token;
                   customHeaderRequest
                       .put(url)
                       .on('error', (err) => {
                           console.log(err);
                           return res.render('dscMembers', {message:'try again', members: ''});
                       })
                       .on('response', (response) => {
                           console.log(response.statusCode);
                           return res.redirect('/admin/members');
                       });
               });
           }
        });
    } else{
        res.redirect('/');
    }
};