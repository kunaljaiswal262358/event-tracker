const Event = require('../models/event');
const User = require('../models/user');

const addEvent = async(req, res, next) => {
  try {
    const {title, timestamp, location, description, user} = req.body;
    if(!title) return res.status(400).send("Title is required.");
    if(!timestamp) return res.status(400).send("Timestamp is required.");
    if(!location) return res.status(400).send("Location is required.");
    if(!user) return res.status(400).send("User is required.");

    let event = {title, timestamp, location, user};
    if(description) event.description = description;
    event = new Event(event);
    
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res) => {
  try {
    //get id using params
    const {id} = req.params;
    //validate id is valid or not
    const event = await Event.findByIdAndDelete(id);
    if(!event) return res.status(400).send("Invalid event id.");

    //delete and return
    res.status(200).send(event);
  } catch (err) {
    next(err);
  }
};

const editEvent = async (req, res, next) => {
  try {
    const {id} = req.params;

    const event = await Event.findById(id);
    if(!event) return res.status(400).send("Invalid id.")
    
    Object.keys(req.body).forEach(key => {
        event[key] = req.body[key];
    })
    await event.save();

    res.status(200).send(event);
  } catch (err) {
    next(err);
  }
};

const getEventById = async (req, res, next) => {
  try {
    let {id} = req.params;
    //get id and fetch event
    const event = await Event.findById(id);
    if(!event) return res.status(400).send("Invalid event id.");
    res.status(200).send(event);
    //send that event
  } catch (err) {
    next(err);
  }
};

const getPublicEventById = async (req, res, next) => {
  try {
    let {id} = req.params;
    const event = await Event.findById(id);
    if(!event) return res.status(400).send("Invalid event id.");
    if(!event.public) return res.status(400).send("Link(Event) is Private.")
    res.status(200).send(event);
    //send that event
  } catch (err) {
    next(err);
  }
};

const getEventByUserId = async (req, res, next) => {
  try {
    let {userId} = req.params;
    const user = await User.findById(userId);
    if(!user) return res.status(400).send("User id is invalid.")
    const events = await Event.find({user: userId});
    res.status(200).send(events);
    //send that event
  } catch (err) {
    next(err);
  }
};

//all
const getEvents = async (req, res, next) => {
  try {
    //fetch events
    const events = await Event.find();
    //send all events
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
};

module.exports = { addEvent, getPublicEventById, getEventByUserId, deleteEvent, editEvent, getEventById, getEvents };
