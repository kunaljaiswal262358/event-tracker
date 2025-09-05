const express = require('express');
const { addEvent, deleteEvent, editEvent, getEventById, getEvents, getEventByUserId, getPublicEventById } = require('../controllers/event');
const auth = require('../middleware/authorize')
const router = express.Router();

router.post("/", auth, addEvent);
router.delete("/:id", auth, deleteEvent);
router.put("/:id", auth, editEvent);
router.get("/:userId", getEventByUserId);
router.get("/public/:id", getPublicEventById)
// router.get("/:id", getEventById);
// router.get("/", getEvents)
router.get("/", getEvents)

module.exports = router;