import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { login, error, loading } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(values.email, values.password);
    if (success) {
      setSuccessMessage("Login successful! Welcome...");
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const prevPath =
          new URLSearchParams(location.search).get("prev") || "/";
        setSuccessMessage("");
        navigate(prevPath);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, location, navigate]);

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      {/* KIRI: Gambar Background */}
      <div className="relative md:w-1/2 w-full h-40 md:h-auto">
        <img
          src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6HXvXzLNWFU/v1/-1x-1.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* KANAN: Form Login */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 bg-white relative z-10">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600">
              Tour.In
            </h1>
            <img
              src="https://img.freepik.com/free-vector/realistic-travel-horizontal-banner-suitcases-beach-umbrellas-other-attributes-tourism-gathered-together-vector-illustration_1284-81822.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 ml-2 rounded-full"
            />
          </div>
          <p className="text-gray-600">Come and find your next adventure</p>
        </div>

        {/* Error dan Success Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center w-full">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-center w-full">
            {successMessage}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
          {/* Input Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 sm:py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-2 sm:py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 sm:py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link Sign Up */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to={`/signup?prev=${location.pathname}${location.search}`}
              className="text-gray-400 hover:text-gray-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
