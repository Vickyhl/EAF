import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../src/shared/components/FormElements/UIElements/ErrorModal.js";
import { useForm } from "../../src/shared/hooks/formHook";
import Button from "../../src/shared/components/FormElements/Button";
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
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
    } else {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: "vicky",
            lastName: "hlustov",
            email: "vikush40@gmail.com",
            password: "123456",
            // firstName: formState.inputs.firstName.value,
            // lastName: formState.inputs.lastName.value,
            // email: formState.inputs.email.value,
            // password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <div className="container">
        {/* <ErrorModal error={error} onClear={errorHandler} /> */}

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <div>
              <label>Your First Name</label>
              <input
                element="input"
                id="firstName"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={inputHandler}
              />
              <label>Your Last Name</label>
              <input
                element="input"
                id="lastName"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={inputHandler}
              />
            </div>
          )}
          <label htmlFor="email">Email Id</label>
          <input
            element="input"
            type="email"
            id="email"
            name="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onChange={inputHandler}
          />

          <label htmlFor="password">Password</label>
          <input
            element="input"
            type="password"
            id="password"
            name="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters"
            onChange={inputHandler}
          />

          <div className="btn-container">
            <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
          </div>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
