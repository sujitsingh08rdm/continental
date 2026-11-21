import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  image: string;
  name: string;
  role: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Donald Jackman",
    role: "Content Creator",
    review:
      "I've been using prebuiltui for nearly two years, primarily for web pages and it has been incredibly user-friendly, making my work much easier.",
    rating: 5,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Richard Nelson",
    role: "Instagram Influencer",
    review:
      "I've been using this website for nearly a year, primarily for web apps and it has been incredibly amazing, making my work much easier.",
    rating: 5,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: "James Washington",
    role: "Marketing Manager",
    review:
      "I've been using this awesome website for nearly two years, primarily for my saas app and it has been incredibly user-friendly, making my work much easier.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="mt-8 py-12 flex flex-wrap items-center justify-center gap-6 pt-14">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow hover:shadow-lg"
        >
          {/* Profile */}
          <div className="mt-4 flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white"
              src={testimonial.image}
              alt={testimonial.name}
              loading="lazy"
            />

            <div className="pt-8 text-center">
              <h2 className="text-lg font-medium text-gray-800">
                {testimonial.name}
              </h2>
              <p className="text-gray-800/80">{testimonial.role}</p>
            </div>
          </div>

          {/* Review */}
          <p className="text-gray-500 px-6 text-center leading-relaxed">
            {testimonial.review}
          </p>

          {/* Rating */}
          <div
            className="flex justify-center pt-4"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={index} size={18} fill="#FF532E" color="#FF532E" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
