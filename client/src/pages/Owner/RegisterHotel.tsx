import { useState, type ChangeEvent, type SyntheticEvent } from "react";


const RegisterHotel = () => {
  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    rating: "",
    price: "",
    amenities: "",
    image: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setData({ ...data, image: selectedFile as any });
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreview(imageUrl);
      }
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("hotelAddress", data.hotelAddress);
    formData.append("rating", data.rating);
    formData.append("price", data.price);
    formData.append("amenities", data.amenities);
    formData.append("image", file as any);
    console.log(data);
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Hotel Image</p>
          {/* <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div> */}
          <div className="w-full my-4">
            {/* Hotel Image preview */}

            {preview && (
              <div className="mb-3 flex justify-center">
                <img
                  src={preview}
                  alt=""
                  className="w-24 h-24 object-cover rounded shadow"
                />
              </div>
            )}
            {/* File Upload Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 
              cursor-pointer`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Hotel Name
          </label>
          <input
            id="product-name"
            type="text"
            name="hotelName"
            value={data.hotelName}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="hotel-address">
            Hotel Address
          </label>
          <input
            id="hotel-address"
            type="text"
            name="hotelAddress"
            value={data.hotelAddress}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="hotel-rating">
              Rating
            </label>
            <input
              id="hotel-rating"
              type="number"
              name="rating"
              value={data.rating}
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="hotel-price">
              Price
            </label>
            <input
              id="hotel-price"
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="hotel-amenities">
            Hotel Amenities
          </label>
          <textarea
            id="hotel-amenities"
            name="amenities"
            value={data.amenities}
            onChange={handleChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded-lg">
          Register Hotel
        </button>
      </form>
    </div>
  );
};

export default RegisterHotel;
