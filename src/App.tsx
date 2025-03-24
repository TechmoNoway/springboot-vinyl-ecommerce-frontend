import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import RootLayout from "./_root/RootLayout";
import {
  Cart,
  Checkout,
  Home,
  LoginSignup,
  ProductDetail,
  Profile,
  ResetPassword,
  Shop,
} from "./_root/pages";
import QRPayment from "./_root/pages/QRPayment";
import AccountDetails from "./components/shared/AccountDetails";
import AccountOrders from "./components/shared/AccountOrders";

function App() {
  return (
    <main className="w-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:title" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-category/vinyl" element={<Shop />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/account-details" element={<Profile />} />
          <Route element={<Profile />}>
            <Route
              path="/account/details"
              element={<AccountDetails />}
            />
            <Route
              path="/account/orders"
              element={<AccountOrders />}
            />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route
          path="/payment/vietqr/:amount"
          element={<QRPayment />}
        />
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
