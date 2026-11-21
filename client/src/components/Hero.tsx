import { CalendarDays, MapPin, Users, Search } from "lucide-react";
import { homePageData, cities } from "../assets/assets.js";

const Hero = () => {
  return (
    <>
      {/* Main Hero Section */}
      <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-heading font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
            Forget Bust Work,
            <br /> Start Next Vacation
          </h1>
          <p className="text-paragraph mt-4 max-w-md text-sm sm:text-base leading-relaxed">
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </p>
          <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
            <button className="bg-primary text-white rounded-xl px-6 py-2.5 font-medium flex items-center cursor-pointer text-center hover:bg-indigo-600 transition duration-300 active:scale-95">
              Show more
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-16 mt-8">
            {homePageData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={item.icon} className="w-8 h-8" />
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-paragraph">{item.value}</p>
                  <p className="text-paragraph">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-10">
          <img
            src="/hero_img.png"
            alt="hero img"
            className="flex-end w-80 h-55 sm:w-160 sm:h-110 rounded-2xl rounded-tl-4xl"
          />
        </div>
      </main>
      {/* Form SearcH Hotel Icon */}
      <form className="max-w-4xl w-full mx-auto bg-primary text-indigo-50 rounded-lg px-6 py-4 flex flex-col md:flex-row md:items-end gap-4">
        {/* Destination */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <label htmlFor="destinationInput" className="text-sm">
              Destination
            </label>
          </div>

          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full rounded border border-gray-200 bg-white text-gray-800 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check in */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <label htmlFor="checkIn" className="text-sm">
              Check in
            </label>
          </div>

          <input
            id="checkIn"
            type="date"
            className="w-full rounded border border-gray-200 bg-white text-gray-800 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Check out */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <label htmlFor="checkOut" className="text-sm">
              Check out
            </label>
          </div>

          <input
            id="checkOut"
            type="date"
            className="w-full rounded border border-gray-200 bg-white text-gray-800 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Guests */}
        <div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <label htmlFor="guests" className="text-sm">
              Guests
            </label>
          </div>

          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="w-full rounded border border-gray-200 bg-white text-gray-800 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 md:max-w-20"
            placeholder="1"
            defaultValue={1}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-black py-2.5 px-5 text-white cursor-pointer hover:bg-gray-800 transition-colors max-md:w-full"
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </form>
    </>
  );
};

export default Hero;
