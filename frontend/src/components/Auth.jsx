import { useState } from "react";
import { X } from "react-feather";

const Auth = ({ error, setShowAuthModal, handleAuthSubmit }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "login" ? "Login" : "Create Account"}
          </h2>
          <button
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 font-semibold ${
                activeTab === "login"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 font-semibold ${
                activeTab === "signup"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={(e) => handleAuthSubmit(e, user, activeTab)}>
            {activeTab === "signup" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full px-4 py-2 border ${error.name ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border ${error.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {error.email && <span className="text-sm">{error.email}</span>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className={`w-full px-4 py-2 border ${error.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {activeTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {activeTab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "signup" : "login")
                }
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                {activeTab === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
