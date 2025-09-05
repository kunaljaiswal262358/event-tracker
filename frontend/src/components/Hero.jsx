import { Plus } from "react-feather";

const Hero = ({events, user, setShowAddEvent, setShowAuthModal}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
          Keep Track of Your Events
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Mini Event Tracker helps you organize and share your events with ease.
          Never miss an important date again!
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => {user ? setShowAddEvent(true) : setShowAuthModal(true)}}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} className="mr-1" />
            {events?.length > 0 ? "Add Your Event" : "Add Your First Event"}
          </button>
          {!user && <button
            onClick={() => setShowAuthModal(true)}
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Sign Up
          </button>}
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-2">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
            alt="Event planning"
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
