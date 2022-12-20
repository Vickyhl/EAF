import "./components/style.css";
import Header from "./components/Header";
import Routes1 from "./components/Routes1";
import { AuthContext } from "./shared/context/auth-context";
import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";
import Register from "../src/components/Register";
import Main from "../src/components/Main";
import { useState } from "react";

function App() {
  // const user = JSON.stringify(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user"));

  const userID = user?._id;

  console.log(userID);
  return (
    <div>
      <AuthContext.Provider
        value={{
          // isLoggedIn: isLoggedIn,
          userID: userID,
          // login: login,
          // logout: logout,
        }}
      >
        <Header />
        <Routes1 />
      </AuthContext.Provider>
    </div>
  );
}
export default App;
