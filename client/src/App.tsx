import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";
import About from "./pages/About";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const ownerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!ownerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      {!ownerPath && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
