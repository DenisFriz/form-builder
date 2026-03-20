import { Link } from "react-router-dom";
import NotFoundPageHelmet from "./NotFoundPageHelmet";

const NotFound = () => {
  return (
    <>
      <NotFoundPageHelmet />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500 max-w-md">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
