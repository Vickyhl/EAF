import "./components/style.css";
import Header from "./components/Header";
import Routes1 from "./components/Routes1";
import { AuthProvider } from "./AuthProvider";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./components/Login";
import Register from "../src/components/Register";

function App() {
  let userData = localStorage.getItem("user");
  console.log(userData);
  return (
    <div>
      <AuthProvider>
        <Header />
        {!userData ? <Login /> : <Routes1 />}
      </AuthProvider>
    </div>
  );
}
export default App;
