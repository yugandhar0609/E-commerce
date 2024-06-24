import React from "react";
import Hero from "./pages/Hero";
import Populer from "./pages/popular";
import Offer from "./pages/Offer";
import NewCollection from "./pages/NewCollection";
import NewsLetter from "./pages/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Populer />
      <Offer />
      <NewCollection/>
      <NewsLetter/>
      
    </div>
  );
};

export default Home;
