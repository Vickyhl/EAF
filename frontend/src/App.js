import "./components/style.css";
import Header from "./components/Header";
import Routes1 from "./components/Routes1";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  return (
    <div>
      <AuthContext.Provider>
        <Header />
        <Routes1 />
      </AuthContext.Provider>
    </div>
  );
}
export default App;
