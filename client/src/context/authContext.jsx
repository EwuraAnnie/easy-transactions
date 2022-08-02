import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  token: "",
  saveToken: (token) => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return "";
    }
  });

  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
