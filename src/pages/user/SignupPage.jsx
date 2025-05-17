import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Phone, UserPlus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

const SignUpPage = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
    role: "",
  });

  const { register, error, loading } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!values.role) {
      alert("Silakan pilih peran Anda!");
      return;
    }

    if (values.password !== values.repeatPassword) {
      alert("Password dan Repeat Password tidak cocok.");
      return;
    }

    const success = await register(values);
    if (success) {
      setSuccessMessage("Registrasi berhasil! Selamat datang...");
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
      {/* Gambar kiri */}
      <div className="relative md:w-1/2 w-full h-64 md:h-auto">
        <img
          src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6HXvXzLNWFU/v1/-1x-1.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Form kanan */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 sm:p-8 bg-white relative z-10">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-emerald-600">Tour.In</h1>
            <img
              src="https://img.freepik.com/free-vector/realistic-travel-horizontal-banner-suitcases-beach-umbrellas-other-attributes-tourism-gathered-together-vector-illustration_1284-81822.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="w-16 h-16 ml-2 rounded-full"
            />
          </div>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Error / Sukses */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center w-full max-w-md">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-center w-full max-w-md">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5 w-full max-w-md">
          {/* Nama */}
          <InputField
            icon={<User className="h-5 w-5 text-gray-400" />}
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={values.name}
            onChange={handleChange}
          />

          {/* Email */}
          <InputField
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={values.email}
            onChange={handleChange}
          />

          {/* No Telepon */}
          <InputField
            icon={<Phone className="h-5 w-5 text-gray-400" />}
            type="tel"
            name="phoneNumber"
            placeholder="Nomor Telepon"
            value={values.phoneNumber}
            onChange={handleChange}
          />

          {/* Password */}
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            type="password"
            name="password"
            placeholder="Kata Sandi"
            value={values.password}
            onChange={handleChange}
            minLength={8}
          />

          {/* Repeat Password */}
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            type="password"
            name="repeatPassword"
            placeholder="Ulangi Kata Sandi"
            value={values.repeatPassword}
            onChange={handleChange}
            minLength={8}
          />

          {/* Role */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPlus className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              required
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Pilih Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Tombol */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {/* Link ke Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to={`/signin?prev=${location.pathname}${location.search}`}
              className="text-emerald-600 hover:text-emerald-800 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Komponen input dengan icon
const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      required
      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

export default SignUpPage;
