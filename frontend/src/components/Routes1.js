import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import data from "../ContextApi";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreateMenu from "./CreateMenu";
import React from "react";
import Auth from "./Auth";

const Routes1 = () => {
  let userData = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/login" element={!userData ? <Login /> : <Home />} />
      <Route
        path="/createMenu"
        element={!userData ? <Login /> : <CreateMenu />}
      />
    </Routes>
  );
};

export default Routes1;
