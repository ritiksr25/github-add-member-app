require('dotenv').config();

module.exports.team = (req, res) => {
    Team.find({}, (err, team) => {
        if(err) return res.status(404).json({message: 'error', team: ''});
        return res.json({message: 'success', team: team});
    });
};

module.exports.events = (req, res) => {
    Event.find({}, (err, events) => {
        if(err) return res.status(404).json({message: 'error', upcomingevents: '', pastevents: ''});
        else{
            let pastevents = [], upcomingevents = [];
            let i = 0;
            events.forEach((event) => {
                if(event.startDate < new Date){
                    pastevents.push(event); 
                } else{
                    upcomingevents.push(event);
                }
                i++;
                if(events.length == i){
                    return res.json({message: 'success', upcomingevents, pastevents})
                }
            });
        }
    });
}

module.exports.index = (req, res) => {
    Event.find({})
        .sort({startDate: -1})
        .limit(4)
        .exec((err, events) => {
            if(err) return res.status(404).json({message: 'error', story: '', events: ''});
            else{
                Story.findOne({status: 1}, (err, story) => {
                    if(err) return res.status(404).json({message: 'error', story: '', events});
                    return res.json({story, events, message: 'success'});
                });
            }
        });
}

module.exports.about = (req, res) => {
    Story.findOne({status: 1}, (err, story) => {
        if(err) return res.status(404).json({message: 'error', story: ''});
        return res.json({story, message: 'success'});
    });
}