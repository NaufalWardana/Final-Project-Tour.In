import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, X, ChevronDown, CircleUser } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import useCategories from "../../hooks/useCategory";
import MobileNavigation from "./MobileNavigation";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  // State untuk mengelola status menu mobile, login, dropdown, dan dropdown destinasi
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] =
    useState(false);

  // Mengambil data kategori dan status loading dari hook useCategories
  const { categories, loading: categoriesLoading } = useCategories();
  // Mengambil jumlah item di keranjang dari context
  const { cartCount } = useCartContext();
  // Mengambil fungsi logout dari hook useAuth
  const { logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Mengatur status login berdasarkan token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Menutup semua menu saat lokasi berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setDestinationsDropdownOpen(false);
  }, [location]);

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    await logout();
  };

  // Fungsi untuk toggle menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Tour.In</h1>
            <img
              src="https://img.freepik.com/free-vector/realistic-travel-horizontal-banner-suitcases-beach-umbrellas-other-attributes-tourism-gathered-together-vector-illustration_1284-81822.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="w-20 h-20 rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link
                to="/promo"
                className="flex items-center space-x-1 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                Promo
              </Link>

              {/* Destinations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDestinationsDropdownOpen(true)}
                onMouseLeave={() => setDestinationsDropdownOpen(false)}
              >
                <Link
                  to="/activity"
                  className="flex items-center space-x-1 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  Destinations
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>

                {destinationsDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
                    <div className="py-2">
                      {categoriesLoading ? (
                        <div className="px-4 py-2 text-gray-500">
                          Loading...
                        </div>
                      ) : (
                        categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/activity/${category.name.toLowerCase()}`}
                            className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300 relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                  >
                    <CircleUser className="w-6 h-6" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-500"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation
            isMobileMenuOpen={isMobileMenuOpen}
            isLoggedIn={isLoggedIn}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onMobileMenuToggle={toggleMobileMenu}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute right-0 top-0 w-3/4 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="py-4">
              <div className="space-y-1">
                <Link
                  to="/promo"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  Promo
                </Link>

                {/* Destinations Dropdown for Mobile */}
                <div>
                  <Link
                    to={"/activity"}
                    className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                    onClick={() =>
                      setDestinationsDropdownOpen(!destinationsDropdownOpen)
                    }
                  >
                    Destinations
                  </Link>

                  {destinationsDropdownOpen && (
                    <div className="bg-gray-50">
                      {categoriesLoading ? (
                        <div className="px-4 py-2 text-gray-500">
                          Loading...
                        </div>
                      ) : (
                        categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/activity/${category.name.toLowerCase()}`}
                            className="block px-8 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <Link
                  to="/cart"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <ShoppingCart className="size-5 inline-block mr-3" />
                    Cart
                  </div>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="p-4 mt-4 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
