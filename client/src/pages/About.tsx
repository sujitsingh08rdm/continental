import {
  Award,
  BedDouble,
  Globe2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const stats = [
  { value: "10K+", label: "Happy Travelers", icon: Users },
  { value: "500+", label: "Premium Hotels", icon: BedDouble },
  { value: "50+", label: "Destinations", icon: Globe2 },
  { value: "4.9/5", label: "Guest Rating", icon: Star },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Bookings",
    description:
      "Enjoy a secure and reliable booking experience with transparent pricing and no hidden surprises.",
  },
  {
    icon: Award,
    title: "Handpicked Hotels",
    description:
      "Discover carefully selected hotels that offer excellent comfort, quality, and memorable experiences.",
  },
  {
    icon: Heart,
    title: "Guest First Approach",
    description:
      "Your comfort matters to us. We focus on making every step of your journey simple and enjoyable.",
  },
  {
    icon: Sparkles,
    title: "Easy Experience",
    description:
      "From discovering your perfect room to completing your reservation, everything is designed to be effortless.",
  },
];

const About = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { navigate } = context;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm mb-6">
            <MapPin size={16} />
            Discover. Explore. Stay.
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Making Every Stay
            <br />A Beautiful Memory
          </h1>

          <p className="text-indigo-100 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            We believe every journey deserves a perfect place to stay. Discover
            amazing destinations, explore comfortable rooms, and create
            unforgettable travel experiences with us.
          </p>

          <button
            onClick={() => {
              navigate("/rooms");
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Explore Rooms
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Our Platform
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-heading mt-3 leading-tight">
              Your Journey Begins With The Perfect Stay
            </h2>

            <p className="text-paragraph mt-6 leading-relaxed">
              We are passionate about making travel easier and more enjoyable.
              Our platform helps travelers discover and book comfortable
              accommodations for every kind of journey.
            </p>

            <p className="text-paragraph mt-4 leading-relaxed">
              Whether you're planning a relaxing vacation, a business trip, or a
              weekend getaway, we help you find a place where you can feel at
              home, wherever you go.
            </p>

            <button
              onClick={() => {
                navigate("/rooms");
                scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-8 bg-primary hover:bg-indigo-700 text-white px-7 py-3 rounded-lg font-medium transition"
            >
              Discover Our Rooms
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000"
              alt="Luxury hotel swimming pool"
              className="w-full h-80 md:h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading">
              Our Journey In Numbers
            </h2>
            <p className="text-paragraph mt-3">
              Bringing travelers and memorable stays together.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={26} />
                </div>

                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>

                <p className="text-gray-500 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-heading mt-3">
            Making Travel Simple And Special
          </h2>

          <p className="text-paragraph mt-4">
            We bring together everything you need for a comfortable and
            stress-free booking experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-7 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Icon className="text-primary" size={27} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-indigo-400 rounded-2xl px-6 py-14 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready For Your Next Adventure?
          </h2>

          <p className="text-indigo-100 max-w-xl mx-auto mt-4">
            Find your perfect stay and start planning your next unforgettable
            journey today.
          </p>

          <button
            onClick={() => {
              navigate("/rooms");
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Browse All Rooms
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
