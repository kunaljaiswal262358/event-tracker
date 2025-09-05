import { Calendar, Plus, Menu, X as CloseIcon } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar = ({user, handleLogout, isNavOpen, setIsNavOpen, setShowAddEvent, setShowAuthModal}) => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to={"/"} className="flex items-center">
        <Calendar className="text-indigo-600 mr-2" />
        <span className="text-xl font-bold text-indigo-700">EventTracker</span>
      </Link>

      <button
        className="md:hidden text-indigo-700"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <CloseIcon /> : <Menu />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <button
          onClick={() => setShowAddEvent(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Event
        </button>
        {!user && <button
          onClick={() => setShowAuthModal(true)}
          className="text-indigo-700 hover:text-indigo-900 transition-colors"
        >
          Sign In
        </button>}
        {user && <button
          onClick={() => handleLogout()}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Logout
        </button>}
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden py-4 px-6 flex flex-col space-y-4">
          <button
            onClick={() => {
              setShowAddEvent(true);
              setIsNavOpen(false);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add Event
          </button>
          {!user && <button
            onClick={() => {
              setShowAuthModal(true);
              setIsNavOpen(false);
            }}
            className="text-indigo-700 hover:text-indigo-900 transition-colors text-center"
          >
            Sign In
          </button>}
          {user && <button
            onClick={() => {
              handleLogout();
              setIsNavOpen(false);
            }}
            className="text-red-500 hover:text-red-700 transition-colors text-center"
          >
            Logout
          </button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
