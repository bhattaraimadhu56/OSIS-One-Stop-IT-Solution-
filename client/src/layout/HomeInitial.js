import React from "react";
import image from "../images/img2.svg";
import Commom from "./Common";

const HomeInitial = () => {
  return (
    <>
      <Commom
        name="Grow your business with"
        imgsrc={image}
        visit="/home"
        btname="Get Started"
      />
    </>
  );
};

export default HomeInitial;
