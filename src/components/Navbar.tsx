import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Crypto Monitor
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/alerts" className="text-white hover:text-gray-200">
            Alerts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
