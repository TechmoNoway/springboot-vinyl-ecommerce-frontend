import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <div className="flex flex-col w-full">
                <Header />

                <section className="">
                    <Outlet />
                </section>

                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
