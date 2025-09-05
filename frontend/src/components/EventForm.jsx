import { X } from "react-feather";
import axios from "axios";

const EventForm = ({ newEvent, setNewEvent, user, setShowAddEvent, events, setEvents }) => {

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.location && newEvent.timestamp) {
      const copy = [...events];
      try {
        const event = {
          ...newEvent,
          timestamp: new Date(newEvent.timestamp).toISOString(),
        };
        setEvents([...events, event]);
        setShowAddEvent(false);
        const baseUrl = process.env.REACT_APP_BACKEND_API;
        const url = `${baseUrl}/event`;
        const res = await axios.post(url, {...event, user: user._id}, {withCredentials: true});
        const updated = res.data;
        setEvents([...copy, updated]);
        setNewEvent({
          title: "",
          location: "",
          description: "",
          timestamp: "",
        });
      } catch (err) {
        setEvents(copy);
        let errMsg = err.response.data;
        console.log(errMsg)
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Add New Event</h2>
          <button
            onClick={() => setShowAddEvent(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleAddEvent}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Event title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Event location"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="timestamp">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="timestamp"
                value={newEvent.timestamp}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, timestamp: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Event description"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
