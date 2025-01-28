import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';

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
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;
