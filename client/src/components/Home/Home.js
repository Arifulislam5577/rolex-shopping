import React from "react";
import Arrival from "../Arrival/Arrival";
import Featured from "../Featured/Featured";
import Hero from "../Hero/Hero";
import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Arrival />
      <Products />
    </>
  );
};

export default Home;
