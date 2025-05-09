import React from "react";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// User
import LoginPage from "./pages/user/LoginPage";
import LandingPage from "./pages/user/LandingPage";
import SignupPage from "./pages/user/SignupPage";
import PromoPage from "./pages/user/PromoPage";
import DestinationsPage from "./pages/user/ActivityPage";
import ActivityDetailPage from "./pages/user/ActivityDetailPage";
import CartPage from "./pages/user/CartPage";
import PaymentsPage from "./pages/user/PaymentsPage";
import TransactionDetailPage from "./pages/user/TransactionDetailPage";
import TransactionsPage from "./pages/user/TransactionsPage";
import UpdateProfilePage from "./pages/user/UpdateProfilePage";
import ProfilePage from "./pages/user/ProfilePage";

// Admin
import ActivityDetailManagement from "./pages/admin/ActivityDetailManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ActivityManagement from "./pages/admin/ActivityManagement";
import BannerManagement from "./pages/admin/BannerManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import PromoDetailManagement from "./pages/admin/PromoDetailManagement";
import PromoManagement from "./pages/admin/PromoManagement";
import TransactionDetail from "./pages/admin/TransactionDetail.jsx";
import TransactionManagement from "./pages/admin/TransactionManagement.jsx";
import UserManagement from "./pages/admin/UserManagement";

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
              <Route
                path="/activity/:categoryName"
                element={<DestinationsPage />}
              ></Route>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/promo" element={<PromoPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <UpdateProfilePage />
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
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions/:transactionId"
                element={
                  <ProtectedRoute>
                    <TransactionDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments/:transactionId"
                element={
                  <ProtectedRoute>
                    <PaymentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <h1>Dashboard</h1>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category-management"
                element={
                  <ProtectedRoute adminOnly>
                    <CategoryManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute adminOnly>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-management"
                element={
                  <ProtectedRoute adminOnly>
                    <ActivityManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-management/:activityId"
                element={
                  <ProtectedRoute adminOnly>
                    <ActivityDetailManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promo-management"
                element={
                  <ProtectedRoute adminOnly>
                    <PromoManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promo-management/:promoId"
                element={
                  <ProtectedRoute adminOnly>
                    <PromoDetailManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/banner-management"
                element={
                  <ProtectedRoute adminOnly>
                    <BannerManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaction-management"
                element={
                  <ProtectedRoute adminOnly>
                    <TransactionManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaction-management/:transactionId"
                element={
                  <ProtectedRoute adminOnly>
                    <TransactionDetail />
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
