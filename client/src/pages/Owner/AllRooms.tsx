import { useContext } from "react";
import { AppContext } from "../../context/AppContext.js";
import { MapPin, StarIcon } from "lucide-react";

const AllRooms = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { roomData, navigate } = context;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header start */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">All Rooms</h1>
            <p className="text-gray-500">Manage Your Rooms Here</p>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 hover:bg-indigo-700 rounded-md cursor-pointer"
            onClick={() => navigate("/owner/add-room")}
          >
            Add New Room
          </button>
        </div>
        {/* Header end */}
        {/* Room Table start */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Room Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Price/Night
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Amenities
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {roomData.map((room: any, index: number) => (
                  <tr
                    key={room._id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={room.images[0]}
                            alt={room.roomType}
                            className="w-20 h-16 rounded-xl object-cover shadow-md"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent rounded-xl"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {room.hotel.name}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {room.roomType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {room.hotel.address}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <StarIcon className="text-yellow-500 fill-current" />{" "}
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {room.hotel.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          ${room.pricePerNight}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity: any, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 font-semibold rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button className="bg-red-500 text-white py-1 px-4 rounded-full cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
