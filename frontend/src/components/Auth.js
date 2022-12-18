import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../src/shared/hooks/formHook";
import Input from "../../src/shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../src/shared/util/validators";
import { AuthContext } from "../../src/shared/context/auth-context";
import "./Auth.css";
import Card from "../../src/shared/components/FormElements/UIElements/Card.js";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let userData = localStorage.getItem("user");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    // if (isLoginMode) {
    //   try {
    // const responseData = await sendRequest(
    //   "http://localhost:5000/api/users/login",
    //   "POST",
    //   JSON.stringify({
    //     email: formState.inputs.email.value,
    //     password: formState.inputs.password.value,
    //   }),
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    // auth.login(responseData.user.id);
    //   } catch (err) {}
    // } else {
    //   try {
    //     const formData = new FormData();
    //     formData.append("email", formState.inputs.email.value);
    //     formData.append("name", formState.inputs.name.value);
    //     formData.append("password", formState.inputs.password.value);
    //     formData.append("image", formState.inputs.image.value);
    // const responseData = await sendRequest(
    //   "http://localhost:5000/api/users/signup",
    //   "POST",
    //   formData
    // );

    //   auth.login(responseData.user.id);
    // } catch (err) {}
  };

  return (
    <div className="container">
      <form onSubmit={authSubmitHandler}>
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          id="email"
          name="email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onChange={inputHandler}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters"
          onChange={inputHandler}
        />

        <div className="btn-container">
          <button className="btn">Login</button>
          <button
            className="btn"
            onClick={() =>
              window.location.assign("http://localhost:3000/register")
            }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
