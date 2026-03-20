import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-gray-600 py-4 text-center">
        &copy; {new Date().getFullYear()} FormBuilder
      </footer>
    </div>
  );
};

export default Layout;
