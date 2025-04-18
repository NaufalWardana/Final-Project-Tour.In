import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
  // Inisialisasi form dengan custom hook useForm
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  // Mengambil fungsi dan state yang diperlukan dari hooks
  const { login, error, loading } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Handler untuk submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(values.email, values.password);
    if (success) {
      setSuccessMessage("Login successful! Welcome...");
    }
  };

  // Effect untuk menangani redirect setelah login berhasil
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
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <img
        src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6HXvXzLNWFU/v1/-1x-1.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-t from-gray-500 to-emerald-400 p-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Tour.In</h1>
            <img
              src="https://img.freepik.com/free-vector/realistic-travel-horizontal-banner-suitcases-beach-umbrellas-other-attributes-tourism-gathered-together-vector-illustration_1284-81822.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="w-20 h-20 ml-2 rounded-full"
            />
          </div>
          <p className="text-white/80">Come and find your next adventure</p>
        </div>

        <div className="p-8">
          {/* Error dan Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-center">
              {successMessage}
            </div>
          )}
          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
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
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Link ke Halaman Sign Up */}
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
    </div>
  );
};

export default LoginPage;
