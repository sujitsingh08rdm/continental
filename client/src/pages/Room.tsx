import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Bath,
  Building,
  Calendar,
  Car,
  CheckCircle,
  Coffee,
  Eye,
  MapPin,
  Mountain,
  Phone,
  Star,
  TreePine,
  Tv,
  User,
  Utensils,
  Wifi,
  Wine,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Room = () => {
  const { id } = useParams();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { roomData } = context;
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(1);

  const room = roomData.find((r: any) => r._id == id);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Room not found or still loading...
        </p>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ElementType> = {
      "Ocean View": Eye,
      "Mountain View": Mountain,
      "City View": Building,
      "Garden View": TreePine,
      Balcony: Building,
      "Mini Bar": Wine,
      "Room Service": Utensils,
      "Free Wifi": Wifi,
      "Premium Wifi": Wifi,
      "Work Desk": Building,
      "Concierge Service": User,
      "Breakfast Included": Coffee,
      Parking: Car,
      "Smart TV": Tv,
      "Spa Access": Bath,
      "Pool Access": Bath,
      Kitchen: Utensils,
      "Living Area": Building,
      "Private Terrace": Building,
      "Butler Service": User,
      Jacuzzi: Bath,
      "Panoramic View": Eye,
    };

    return iconMap[amenity] || CheckCircle;
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please Select check in and check out dates");
      return;
    }
    toast.success("Bookig Success");
  };
  console.log(room);

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-700">
                {room.roomType}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span>{room.hotel.hotelAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span>{room.hotel.rating}</span>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${room.isAvailable ? "bg-green-100 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {room.isAvailable ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Available</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      <span>Unavailable</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${room.pricePerNight}
                <span>/night</span>
              </div>

              <div className="text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{room.hotel.owner.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91-987654321</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* image gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">
            Room Gallery
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <img
                src={`http://localhost:8080/images/${room.images[selectedImage]}`}
                alt={`${room.roomType} - Image ${selectedImage + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {room.images.map((image: any, index: number) => (
                <img
                  key={index}
                  src={`http://localhost:8080/images/${image}`}
                  alt={`${room.roomType} - Image ${index + 1}`}
                  className={`h-24 lg:h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${selectedImage === index ? "ring-4 ring-blue-400 opacity-100" : "opacity-80 hover:opacity-100"}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Room details + Bookings */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Room details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Room
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {room.description}
              </p>
            </div>
            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Room Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {room.amenities
                  .split(", ")
                  .map((amenity: any, index: number) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div
                        className="items-center justify-center flex gap-2 p-2 rounded-2xl bg-indigo-50"
                        key={index}
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-gray-700 font-medium">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* hotel facilties */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Hotel Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {room.hotel.amenities
                  .split(",")
                  .map((amenity: any, index: number) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div
                        className="items-center justify-center flex gap-2 p-2 rounded-2xl bg-indigo-50"
                        key={index}
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-gray-700 font-medium">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/*  */}
          </div>
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Book This Room
              </h2>
              <div className="space-y-4">
                {/* Check in date */}
                <div>
                  <label
                    htmlFor="checkin"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span>
                      <Calendar className="w-4 h-4 inline-block mr-2" />
                    </span>
                    <span>Check-in Date</span>
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                {/* Check out date */}
                <div>
                  <label
                    htmlFor="checkout"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    <span>Check-out Date</span>
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                {/* No of guest */}
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    <span>Guests</span>
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={persons}
                    min={1}
                    max={10}
                    onChange={(e) => setPersons(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                {/* price */}
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price Per Night</span>
                    <span className="text-xl font-bold">
                      ${room.pricePerNight}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition duration-300 ${room.isAvailable ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 hover:bg-gray-500 cursor-not-allowed text-gray-900"}`}
                  type="submit"
                  onClick={handleBooking}
                  disabled={!room.isAvailable}
                >
                  {room.isAvailable ? "Check Availability " : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
