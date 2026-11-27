import {
  CheckCircle,
  Clock,
  XCircle,
  CircleHelp,
  MapPin,
  User,
  Calendar,
  CreditCard,
  Trash,
} from "lucide-react";
import moment from "moment";
import httpRequest from "../../utils/httpRequest.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClientCatchError from "../../utils/ClientCatchError.js";

type BookingStatus = "confirmed" | "pending" | "cancelled";

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);

  const getUserBooking = async () => {
    try {
      const { data } = await httpRequest.get("/api/booking/hotel");
      console.log(data);

      if (data.success) {
        setBookingData(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      ClientCatchError(error);
    }
  };
  console.log(bookingData);

  useEffect(() => {
    getUserBooking();
  }, []);

  const getStatusColor = (status: BookingStatus | string): string => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h2>
          <p className="text-lg text-gray-600">
            Here are your hotel bookings. You can view details and manage your
            reservations
          </p>
        </div>
        {/* Booking List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700">
            <div className="col-span-5">Hotel & Room</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-2">Payments</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {bookingData.map((booking: any) => {
              return (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
                    {/* Hotel and Room Info */}
                    <div className="col-span-1 md:col-span-5">
                      <div className="flex gap-4">
                        <img
                          src={`http://localhost:8080/images/${booking.room.images[0]}`}
                          alt={booking.room.roomType}
                          className="w-20 h-16 md:w-24 md:h-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-700 text-md mb-1">
                            {booking.hotel.hotelName}
                          </h3>
                          <p className="font-medium mb-1 text-indigo-500 ">
                            {booking.room.roomType}
                          </p>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">
                              {booking.hotel.hotelAddress}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                            <User className="w-3 h-3" />
                            <span className="truncate">
                              {booking.persons} Guest
                              {booking.guests > 0 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <div className="col-span-1 md:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p>
                              {moment(booking.checkIn).format("DD MMM, YY")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p>
                              {moment(booking.checkOut).format("DD MMM, YY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Payments */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400 " />
                          <span className="text-sm text-gray-600">
                            {booking.paymentMethod === "payathotel"
                              ? "Pay-at-Arrival"
                              : "Stripe"}
                          </span>
                        </div>
                        <p className="font-bold text-lg text-gray-800">
                          ${booking.totalPrice}
                        </p>
                        <div
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${booking.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </div>
                      </div>
                    </div>
                    {/* status + action */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`}
                        />
                        <span
                          className={`px-4 py-2 rounded-4xl font-medium capitalize ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                        <div className="flex gap-2">
                          {booking.status !== "cancelled" && (
                            <button
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel Booking"
                            >
                              <Trash />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
