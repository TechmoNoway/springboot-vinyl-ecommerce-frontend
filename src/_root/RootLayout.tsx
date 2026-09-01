import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CartDrawer from "@/components/shared/CartDrawer";
import FloatingAudioPlayer from "@/components/shared/FloatingAudioPlayer";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] text-[#13151A]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingAudioPlayer />
    </div>
  );
};

export default RootLayout;
