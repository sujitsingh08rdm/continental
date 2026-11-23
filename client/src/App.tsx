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
import OwnerLayout from "./pages/Owner/OwnerLayout";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import AllHotels from "./pages/Owner/AllHotels";
import RegisterHotel from "./pages/Owner/RegisterHotel";
import AllRooms from "./pages/Owner/AllRooms";
import AddRoom from "./pages/Owner/AddRoom";
import Bookings from "./pages/Owner/Bookings";

function App() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { owner } = context;
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

        <Route path="/owner" element={owner ? <OwnerLayout /> : <Login />}>
          <Route index element={<AllHotels />} />
          <Route path="rooms" element={<AllRooms />} />
          <Route path="register-hotel" element={<RegisterHotel />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
      {!ownerPath && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
