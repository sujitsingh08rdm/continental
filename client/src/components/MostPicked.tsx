import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MostPicked = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { hotelData } = context;

  return (
    <div className="py-12">
      <h1 className="text-3xl text-heading font-semibold mx-auto text-center">
        Most Picked Hotel
      </h1>
      <p className="text-paragraph text-sm text-center max-w-lg mx-auto">
        Explore our top-rated hotels, loves by guests for comfort, location and
        cleaniness
      </p>
      <div className="flex items-center flex-wrap justify-center mt-12 gap-8 mx-auto max-w-4xl ">
        {hotelData.map((item: any, index: number) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden cursor-pointer"
          >
            <img src={item.image} className="size-56 object-cover object-top" />
            <div className="absolute p-4 inset-0 flex flex-col text-white justify-end bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 group-active:opacity-100">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-sm">{item.address}</p>
              <p className="text-lg font-medium">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPicked;
