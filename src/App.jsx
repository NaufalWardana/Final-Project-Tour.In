import React from "react";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/user/LoginPage";
import LandingPage from "./pages/user/LandingPage";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <h1>Dashboard</h1>
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
