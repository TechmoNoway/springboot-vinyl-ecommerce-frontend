import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import RootLayout from './_root/RootLayout';
import { Cart, Checkout, Home, LoginSignup, ProductDetail, Shop } from './_root/pages';
import QRPayment from './_root/pages/QRPayment';

function App() {
    return (
        <main className="w-screen">
            <Routes>
                {/* Public Routes */}
                {/* <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignInForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />
                </Route> */}

                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:title" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/product-category/vinyl" element={<Shop />} />
                    <Route path="/login-signup" element={<LoginSignup />} />
                </Route>
                <Route path="/payment/vietqr/:amount" element={<QRPayment />} />
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
