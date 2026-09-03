import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./_root/RootLayout";
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Account Nested Routes */}
          <Route path="/account" element={<Profile />}>
            <Route index element={<Navigate to="/account/details" replace />} />
            <Route path="details" element={<AccountDetails />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="wishlist" element={<AccountWishlist />} />
            <Route path="addresses" element={<AccountAddresses />} />
          </Route>
          <Route path="/account-details" element={<Navigate to="/account/details" replace />} />
        </Route>

        {/* Standalone payment route */}
        <Route path="/payment/vietqr/:amount" element={<QRPayment />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
