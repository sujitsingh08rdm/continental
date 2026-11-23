import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.js";
import { MapPin, StarIcon } from "lucide-react";
import ClientCatchError from "../../utils/ClientCatchError.js";
import httpRequest from "../../utils/httpRequest.js";
import toast from "react-hot-toast";

const AllHotels = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { navigate } = context;

  const [hotelData, setHotelData] = useState([]);
  console.log(hotelData);

  const fetchOwnerHotels = async () => {
    try {
      const { data } = await httpRequest.get("/api/hotel/get");
      if (data.success) {
        setHotelData(data.hotels);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      ClientCatchError(error);
    }
  };

  useEffect(() => {
    fetchOwnerHotels();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header start */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Premium Hotels Collection
            </h1>
            <p className="text-gray-500">
              Discover exceptional Stays around the world
            </p>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 hover:bg-indigo-700 rounded-md cursor-pointer"
            onClick={() => navigate("/owner/register-hotel")}
          >
            Register Hotel
          </button>
        </div>
        {/* Header end */}
        {/* Hotel Table start */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Contact Number
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
                {hotelData.map((hotel: any, index: number) => (
                  <tr
                    key={hotel._id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={`http://localhost:8080/images/${hotel.image}`}
                            alt={hotel.hotelName}
                            className="w-20 h-16 rounded-xl object-cover shadow-md"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent rounded-xl"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {hotel.hotelName}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {hotel.hotelAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {hotel.owner.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          +91-987654321
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <StarIcon className="text-yellow-500 fill-current" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {hotel.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-2xl font-medium text-green-600">
                        ₹{hotel.price}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities
                          .split(",")
                          .map((amenity: any, index: number) => (
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

export default AllHotels;
