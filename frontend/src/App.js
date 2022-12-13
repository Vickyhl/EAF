import "./components/style.css";
import Header from "./components/Header";
import Routes1 from "./components/Routes1";
import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";
import Register from "../src/components/Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?._id;
  console.log(userID);
  return (
    <div>
      <AuthProvider>
        <Header />
        {!user ? <Login /> : <Routes1 />}
      </AuthProvider>
    </div>
  );
}
export default App;
