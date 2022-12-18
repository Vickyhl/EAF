import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createMenu } from "../api/index";
import { useDispatch, useSelector } from "react-redux";

const Main = (handleClick) => {
  //   const [count, setCount] = useState(0);
  let isRegistred = 0;

  return (
    <div className="container">
      <div>Do you have a user?</div>
      <div className="btn-container">
        <button
          className="btn"
          onClick={(event) => handleClick(isRegistred + 1)}
        >
          Login
        </button>
        <button
          className="btn"
          onClick={() =>
            window.location.assign("http://localhost:3000/register")
          }
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Main;
