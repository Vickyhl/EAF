import { useState, useEffect } from "react";
import AuthContext from "./ContextApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
