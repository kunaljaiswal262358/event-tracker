import { useState, useEffect } from "react";
import { Calendar, MapPin, AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicEventPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    if (!eventId) {
      setError("Invalid event link. No event ID provided.");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BACKEND_API;
        const url = `${baseUrl}/event/public/${eventId}`;
        const res = await axios.get(url);
        const event = res.data;
        setEvent(event)
      } catch (err) {
        console.log(err)
        setError("This event(link) is private.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  },[eventId]);

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

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Unable to View Event
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (event) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Calendar className="text-indigo-600 mr-3" size={20} />
                <span>{formatDate(event.timestamp)}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <MapPin className="text-indigo-600 mr-3" size={20} />
                <span>{event.location}</span>
              </div>
            </div>

            {event.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              This is a public event page. Anyone with the link can view this
              event.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PublicEventPage;
