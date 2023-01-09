import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let userData = localStorage.getItem("user");
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/home");
    localStorage.clear();
  };

  return (
    <ul>
      <div className="navbar-brand ">
        <h1>Electronic voting system</h1>
      </div>
      <li>
        <a href="vote">Vote</a>
      </li>
    </ul>
  );
}
