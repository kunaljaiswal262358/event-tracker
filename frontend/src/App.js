import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Auth from "./components/Auth";
import EventForm from "./components/EventForm";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EventTrackerApp = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [newEvent, setNewEvent] = useState({ title: "", location: "", description: "", timestamp: ""});
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleAuthSubmit = async (e, newUser, activeTab) => {
    try {
      e.preventDefault();
      setError({
        name: "",
        email: "",
        password: "",
      });
      const formData = { ...newUser };
      if (activeTab === "login") {
        delete formData.name;
      }
      const baseUrl = process.env.REACT_APP_BACKEND_API;
      const api = `${baseUrl}/auth/${
        activeTab === "login" ? "login" : "signup"
      }`;

      const res = await axios.post(api, formData);
      const token = res.data;
      document.cookie = `auth-token=${token}; path=/; max-age=3600`;
      const user = jwtDecode(token);
      setUser(user)
      fetchEvents(user);
      setShowAuthModal(false);
    } catch (err) {
      console.log(err);
      if(err?.response?.data) {
        const errMsg = err.response.data;
        if (errMsg === "Invalid Email") setError({ ...error, email: errMsg });
        if (errMsg === "Password mismatch")
          setError({ ...error, password: errMsg });
        if (errMsg?.includes("duplicate key error"))
          setError({ ...error, email: "Duplicate Email" });
        console.log(errMsg);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEvents([]);
    document.cookie = "auth-token=; path=/; max-age=0";
  };

  const fetchEvents = async (user) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_API;
      const url = `${baseUrl}/event/${user._id}`;
      const res = await axios.get(url);
      const events = res.data;
      setEvents(events)
      console.log(events)
    } catch (err) {
      const errMsg = err;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    let token = Cookies.get("auth-token");
    if(token) {
      let user = jwtDecode(token);
      if(user) {
        setUser(user)
        fetchEvents(user);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar
        user={user}
        handleLogout={handleLogout}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        setShowAddEvent={setShowAddEvent}
        setShowAuthModal={setShowAuthModal}
      />

      <main className="container mx-auto px-4 py-8">
        <Hero
          events={events}
          setShowAddEvent={setShowAddEvent}
          user={user}
          setShowAuthModal={setShowAuthModal}
        />
        <Events events={events} setEvents={setEvents} user={user} setShowAuthModal={setShowAuthModal} setShowAddEvent={setShowAddEvent} />
      </main>

      {showAuthModal && (
        <Auth
          error={error}
          setShowAuthModal={setShowAuthModal}
          handleAuthSubmit={handleAuthSubmit}
        />
      )}

      {showAddEvent && (
        <EventForm
          user={user}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          setShowAddEvent={setShowAddEvent}
          events={events}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default EventTrackerApp;
