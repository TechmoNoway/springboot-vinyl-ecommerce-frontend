import React from "react";
import Banner from "@/components/shared/Banner";
import ReadyVinylList from "@/components/shared/ReadyVinylList";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <ReadyVinylList />
    </div>
  );
};

export default Home;
