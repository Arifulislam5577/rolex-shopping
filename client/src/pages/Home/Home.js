import React from "react";
import Arrival from "../../components/Arrival/Arrival";
import Featured from "../../components/Featured/Featured";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";

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
