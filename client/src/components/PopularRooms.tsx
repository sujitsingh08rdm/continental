import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PopularRooms = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { navigate, roomData } = context;

  return (
    <div className="py-12">
      <h1 className="text-3xl text-heading font-semibold mx-auto text-center">
        Popular Rooms
      </h1>
      <p className="text-paragraph text-sm max-w-lg mx-auto text-center">
        Explore our top-rated rooms, loves by guests for comfort, location and
        cleaniness
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 max-w-7xl mx-auto mt-12">
        {roomData.map((item: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-200 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80 hover:scale-105 hover:shadow-lg"
          >
            <img
              className="rounded-md max-h-40 w-full object-cover"
              src={item.images[0]}
              alt="officeImage"
            />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
              {item.roomType}
            </p>
            <div className="flex items-center justify-between">
              <p>${item.pricePerNight}/per Night</p>
              <button
                type="button"
                className="bg-primary hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm"
                onClick={() => {
                  navigate(`/room/${item._id}`);
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRooms;
