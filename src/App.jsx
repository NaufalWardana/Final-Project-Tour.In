import React from "react";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/user/LoginPage";
import LandingPage from "./pages/user/LandingPage";
import SignupPage from "./pages/user/SignupPage";
import PromoPage from "./pages/user/PromoPage";
import DestinationsPage from "./pages/user/ActivityPage";
import ActivityDetailPage from "./pages/user/ActivityDetailPage";
import CartPage from "./pages/user/CartPage";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/activity/detail/:activityId"
                element={<ActivityDetailPage />}
              />
              <Route path="/activity" element={<DestinationsPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/promo" element={<PromoPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <h1>Dashboard</h1>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
