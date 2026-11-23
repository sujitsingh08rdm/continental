import { Mail, Lock, Eye, EyeOff, UserRoundIcon, UserKey } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import httpRequest from "../utils/httpRequest";
import ClientCatchError from "../utils/ClientCatchError";
import toast from "react-hot-toast";

const Signup = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { navigate } = context;

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await httpRequest.post("/api/auth/signup", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      ClientCatchError(error);
    }
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
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-indigo-500 transition-colors">
          <UserKey size={18} className="text-gray-400" />
          <select
            name="role"
            className="bg-transparent w-full h-full text-gray-500 placeholder-gray-500 outline-none text-sm"
            value={formData.role}
            onChange={onChangeHandler}
          >
            <option value="">Select your role</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </select>
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
