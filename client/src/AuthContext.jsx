import { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    fetch("/api/auth")
      .then((response) => response.json())
      .then((data) => setIsLogged(data));
  }, []);

  return (
    <>
      <LoginContext.Provider value={{ isLogged, setIsLogged }}>
        {children}
      </LoginContext.Provider>
    </>
  );
}
