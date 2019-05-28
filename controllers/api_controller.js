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

module.exports.ideas = (req, res) => {
    const { name, email, technology, title, description } = req.body;
    if(!name || !email || !technology || !title || !description){
        return res.status(400).json({ 
            message: 'All fields are mandatory!!'
        });
    }
    // email regex : /\S+@\S+\.\S+/
    const emailFormat = /\S+@\S+\.\S+/;
    if(emailFormat.test(email)){
        Idea.create(req.body).then(() => {
            return res.status(200).json({ 
                message: "Thanks! Your idea has been submitted successfully!!" 
            })
        }).catch(err => res.status(500).json({
             message: 'Oops! Something went wrong!!'
            }))
    }
    else{
        return res.status(400).json({
            message: 'Please enter a valid email address.'
        });
    }
}