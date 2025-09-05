import { Calendar, MapPin, Clock, Share2, Trash2 } from "react-feather";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = ({ user, events, setEvents, setShowAddEvent, setShowAuthModal }) => {
  const [filter, setFilter] = useState("upcoming");
  const [filteredEvents, setFilterdEvents] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShareEvent = async (eventId) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_API;
      const url = `${baseUrl}/event/${eventId}`;
      const res = await axios.put(
        url,
        { public: true },
        { withCredentials: true }
      );
      const event = res.data;
      if (event) {
        navigator.clipboard.writeText(`http://localhost:3000/public/${eventId}`);
        alert("Event link copied to clipboard!");
        navigate("/public/"+eventId);
      }
    } catch (err) {
      const errMsg = err.response.data;
      console.log(errMsg);
    }
  };

  const handleDeleteEvent = async (event) => {
    const copy = [...events];
    try {
      const updated = events.filter((e) => e._id !== event._id);
      setEvents(updated);
      const baseUrl = process.env.REACT_APP_BACKEND_API;
      const url = `${baseUrl}/event/${event._id}`;
      await axios.delete(url, { withCredentials: true });
    } catch (err) {
      setEvents(copy);
      const errMsg = err;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    const filtered = events.filter((event) => {
      const now = new Date();
      const eventDate = new Date(event.timestamp);
      return filter === "upcoming" ? eventDate > now : eventDate <= now;
    });
    setFilterdEvents(filtered);
  }, [events, filter]);

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Events</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-lg ${
              filter === "upcoming"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-700"
            } transition-colors`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 rounded-lg ${
              filter === "past"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-700"
            } transition-colors`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">
            {filter === "upcoming"
              ? "You don't have any upcoming events."
              : "You don't have any past events."}
          </p>
          <button
            onClick={() => user ? setShowAddEvent(true) : setShowAuthModal(true)}
            className="mt-4 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Add your first event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="border relative border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2 text-indigo-800">
                {event.title}
              </h3>
              <div className="flex absolute top-4 right-2 justify-end space-x-2 mb-2">
                <button
                  onClick={() => handleDeleteEvent(event)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <Clock size={16} className="mr-2" />
                <span>{formatDate(event.timestamp)}</span>
              </div>
              {event.description && (
                <p className="text-gray-700 mb-4">{event.description}</p>
              )}
              <button
                onClick={() => handleShareEvent(event._id)}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Share2 size={16} className="mr-1" />
                Share Event
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Events;
