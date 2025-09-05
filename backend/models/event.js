const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, min: [3, "Minimum charater is 3"], max: [50, "Maximum character is 50"], required: [true, "Title is required."]},
    timestamp: {type: Date, default: Date.now()},
    location: {type: String, min: [4, "Minimum charater is 4"], max: [100, "Maximum character is 100"], required: [true, "Location is required"]},
    description: {type: String, min: [10, "Minimum charater is 10"]},
    user: {type: mongoose.Schema.Types.ObjectId, required: [true, "User(id) is required."]},
    public: {type: Boolean, default: false}
})

const Event = mongoose.model("event", eventSchema);

module.exports = Event;