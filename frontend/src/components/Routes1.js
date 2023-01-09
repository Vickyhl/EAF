import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Vote from "./votersChoice.js";

const Routes1 = () => {
  let userData = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
    </Routes>
  );
};

export default Routes1;
