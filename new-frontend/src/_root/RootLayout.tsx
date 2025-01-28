import Header from '@/components/shared/header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <div className="flex flex-col w-full">
                <Header />

                <section className="flex flex-1">
                    <Outlet />
                </section>  

                {/* <Bottombar /> */}
            </div>
        </>
    );
};

export default RootLayout;
