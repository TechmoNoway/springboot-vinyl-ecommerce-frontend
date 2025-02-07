import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import RootLayout from './_root/RootLayout';
import { Cart, Home, ProductDetail } from './_root/pages';

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
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
