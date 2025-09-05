import { Calendar } from "react-feather";
import PublicEventPage from "../components/PublicEvent";
import { Link } from "react-router-dom";

const SpecificLinkPage = () => {
  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <Calendar className="text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-indigo-700">
            EventTracker
          </span>
        </Link>
      </nav>
      <PublicEventPage />
    </>
  );
};

export default SpecificLinkPage;
