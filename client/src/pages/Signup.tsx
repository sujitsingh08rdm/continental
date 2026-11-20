import { Mail, Lock, Eye, EyeOff, UserRoundIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FormData", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={submitHandler}
        className="w-full sm:w-100 text-center border border-gray-200 rounded-2xl px-8 py-8 bg-white shadow-sm"
      >
        {/* Heading */}
        <h1 className="text-heading text-3xl font-semibold">Welcome</h1>
        <p className="text-paragraph text-sm mt-2">
          Please sign up to continue
        </p>

        {/* Name */}
        <div className="flex items-center mt-8 w-full bg-white border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-indigo-500 transition-colors">
          <UserRoundIcon size={18} className="text-gray-400" />
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Fullname"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>
        {/* Email */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-indigo-500 transition-colors">
          <Mail size={18} className="text-gray-400" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-indigo-500 transition-colors">
          <Lock size={18} className="text-gray-400" />
          <input
            type={displayPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            required
          />
          <button
            type="button"
            onClick={() => setDisplayPassword(!displayPassword)}
          >
            {displayPassword ? (
              <EyeOff size={18} className="text-gray-400 cursor-pointer" />
            ) : (
              <Eye size={18} className="text-gray-400 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="mt-4 text-right">
          <button
            type="button"
            className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition-all font-medium cursor-pointer"
        >
          Register
        </button>

        {/* Register Link */}
        <p className="text-gray-500 text-sm mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-500 font-medium hover:underline"
          >
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
