import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./_root/RootLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  Home,
  Shop,
  ProductDetail,
  Cart,
  Checkout,
  OrderDetails,
  LoginSignup,
  ResetPassword,
  Profile,
  QRPayment,
  AdminDashboard,
} from "./_root/pages";
import AccountDetails from "./components/shared/AccountDetails";
import AccountOrders from "./components/shared/AccountOrders";
import AccountAddresses from "./components/shared/AccountAddresses";
import AccountWishlist from "./components/shared/AccountWishlist";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-category/vinyl" element={<Shop />} />
          <Route path="/product/:title" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Protected Order Details */}
          <Route
            path="/order-details/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Account Nested Routes */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/account/details" replace />} />
            <Route path="details" element={<AccountDetails />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="wishlist" element={<AccountWishlist />} />
            <Route path="addresses" element={<AccountAddresses />} />
          </Route>
          <Route path="/account-details" element={<Navigate to="/account/details" replace />} />
        </Route>

        {/* Protected standalone payment route */}
        <Route
          path="/payment/vietqr/:amount"
          element={
            <ProtectedRoute>
              <QRPayment />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
