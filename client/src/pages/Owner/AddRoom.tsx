import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { hotelsData } from "../../assets/assets.js";

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    images: [],
    amenities: [],
    isAvailable: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const updatedImages = [...roomData.images];
        updatedImages[index] = file;
        setRoomData({ ...roomData, images: updatedImages });
      }
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(roomData);
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Room Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    accept="image/*"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    className="max-w-24 rounded-md cursor-pointer"
                    src={
                      roomData.images[index]
                        ? URL.createObjectURL(roomData.images[index])
                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="Upload"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Room Type</label>
          <input
            type="text"
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Room Description</label>
          <input
            type="text"
            name="description"
            value={roomData.description}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="hotel-price">
              Price/Night
            </label>
            <input
              id="hotel-price"
              type="number"
              name="pricePerNight"
              value={roomData.pricePerNight}
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="hotel-amenities">
            Room Amenities
          </label>
          <textarea
            id="hotel-amenities"
            name="amenities"
            value={roomData.amenities}
            onChange={handleChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Select Hotel</label>
          <select
            name="hotel"
            value={roomData.hotel}
            onChange={handleChange}
            className="outline-none md:py-2.5 p-3 rounded border border-gray-300"
          >
            <option value="">Select Hotel</option>
            {hotelsData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">
              Is Available
              <input
                type="checkbox"
                name="isAvailable"
                onChange={handleChange}
                value={roomData.isAvailable}
                placeholder="0"
                // className="outline-none md:py-2.5 p-3 bg-red-500 rounded border border-gray-300 ml-2"
                className="h-4 w-4 ml-2 accent-indigo-600 cursor-pointer"
                required
              />
            </label>
          </div>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded-lg">
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
