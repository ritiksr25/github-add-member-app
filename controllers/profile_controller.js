const Profile = require('../models/Profile');

module.exports.index = function(req, res){
    return res.render('index');
}

// module.exports.eventDetailsApi = function(req, res){
//     Event.findById(req.params.id).populate('registrations').exec(function(err, event){
//         return res.json(event);
//     });
// }