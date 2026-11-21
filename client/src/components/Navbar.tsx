import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const context = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (!context) {
    throw new Error("AppContextProvider is missing");
  }

  const { navigate, user, setUser } = context;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogin = () => {
    closeMenu();
    navigate("/login");
  };

  const handleLogout = () => {
    toast.success("Logout!");
    setUser(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 bg-primary w-full flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img className="h-10" src="/logo.png" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group text-white font-medium flex flex-col gap-0.5"
          >
            {link.name}
            <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}

        <Link
          to="/owner"
          className="border px-4 py-1 text-sm rounded-full text-white hover:text-indigo-950 hover:bg-indigo-100 transition-all"
        >
          Owner
        </Link>
      </div>

      {/* Desktop Login */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="relative group inline-block">
            <img
              src={assets.profile_icon}
              className="h-12 w-12 rounded-full cursor-pointer"
            />
            {/* dropdown menu */}
            <div className="absolute right-0 w-40 bg-white shadow-lg rounded-md  opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
              <ul className="py-2">
                <li>
                  <Link
                    to="/my-bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Booking
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-8 py-2.5 border border-black rounded-full ml-4 bg-white text-indigo-950 hover:bg-indigo-100 active:scale-95 transition-all"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden text-white"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 z-60 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-[60%] max-w-[320px] h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-8 font-medium transition-transform duration-300 ease-in-out z-70 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="absolute top-5 right-5 text-gray-700 hover:text-indigo-600"
        >
          <X size={26} />
        </button>

        {/* Mobile Links */}
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMenu}
            className="hover:text-indigo-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="/owner"
          onClick={closeMenu}
          className="border px-5 py-2 rounded-full hover:bg-indigo-100 transition-all"
        >
          Owner
        </Link>

        {user ? (
          <>
            {" "}
            <div className="relative group inline-block">
              <img
                src={assets.profile_icon}
                className="h-12 w-12 rounded-full cursor-pointer"
              />
            </div>
            {/* dropdown menu */}
            <ul>
              <li>
                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Booking
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-8 py-2.5 rounded-full bg-primary text-white hover:bg-indigo-600 active:scale-95 transition-all"
          >
            Login
          </button>
        )}
      </aside>
    </nav>
  );
};

export default Navbar;
