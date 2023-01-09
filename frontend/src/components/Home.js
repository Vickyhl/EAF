import React from "react";
import "./style.css";
import firstPic from "./firstPic.jpeg";

const Home = () => {
  return (
    <div className="container-home">
      <img className="img-fluid" alt="homeImg" src={firstPic} />
    </div>
  );
};

export default Home;
