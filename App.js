import "./components/style.css";
import Header from "./components/Header";
import Routes1 from "./components/Routes1";
import { AuthProvider } from "./AuthProvider";
import { useState } from "react";

function App() {
  const [isRegistred, setRegistered] = useState(0);
  const user = JSON.stringify(localStorage.getItem("user"));
  const userID = user?._id;
  console.log(isRegistred);

  const handleClick = (num) => {
    // 👇️ takes parameter passed from Child component
    setRegistered((current) => current + num);
    console.log(!isRegistred);
  };
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes1 />
        {/* <Main /> */}
        {/* {!isRegistred ? <Login /> : <Register />} */}
        {/* {!user ? <Login /> : <Routes1 />} */}
      </AuthProvider>
    </div>
  );
}
export default App;
