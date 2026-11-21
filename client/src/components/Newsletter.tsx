import { CalendarDays, Hand } from "lucide-react";

interface NewsletterFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: NewsletterFeature[] = [
  {
    title: "Weekly articles",
    description:
      "Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.",
    icon: CalendarDays,
  },
  {
    title: "No spam",
    description:
      "Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.",
    icon: Hand,
  },
];

export default function Newsletter() {
  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    console.log("Subscribed email:", email);
  };

  return (
    <div className="py-12 flex flex-col md:flex-row border border-gray-500/30 rounded-lg items-start md:items-center justify-between gap-8 text-sm max-w-5xl  mx-auto bg-white p-8">
      {/* Newsletter content */}
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-700">
          Subscribe to our newsletter
        </h1>

        <p className="text-gray-500 mt-2">
          Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
          velit quis. Duis tempor incididunt dolore.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <input
            name="email"
            className="py-2 px-3 w-full outline-none focus:border-indigo-500/60 transition max-w-64 border border-gray-500/30 rounded-md"
            type="email"
            placeholder="Enter your email"
            required
          />

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all px-6 py-2 rounded text-white font-medium whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Newsletter features */}
      {features.map(({ title, description, icon: Icon }) => (
        <div key={title} className="space-y-4 md:max-w-48 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
              <Icon size={22} className="text-gray-500" />
            </div>

            <h3 className="text-base font-medium text-gray-800">{title}</h3>
          </div>

          <p className="text-gray-500">{description}</p>
        </div>
      ))}
    </div>
  );
}
