import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200">
          FormBuilder
        </Link>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`hover:text-blue-200 ${isActive("/") ? "underline" : ""}`}
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
