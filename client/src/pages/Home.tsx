import Hero from "../components/Hero";
import MostPicked from "../components/MostPicked";
import Newsletter from "../components/Newsletter";
import PopularRooms from "../components/PopularRooms";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="py-16">
      <Hero />
      <MostPicked />
      <PopularRooms />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
