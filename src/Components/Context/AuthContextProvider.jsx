import { createContext, useEffect, useState } from "react";

export const authContext = createContext(); // Create context for authentication

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(""); // State to store the JWT token

  // On component mount, check localStorage for token and decode it
  useEffect(function () {
    const value = localStorage.getItem("tkn"); // Get token from localStorage
    if (value) {
      setToken(value); // Set token in state
    }
  }, []);

  // Provide token and setToken to the entire app via context
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
