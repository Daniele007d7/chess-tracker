import { LoginContext } from "./AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./stylesheets-module/Stats.module.css";

export default function Redirect({ children }) {
  const isLogged = useContext(LoginContext);
  if (!isLogged.isLogged) {
    return (
      <>
        <h1>non sei autorizzato</h1>
        <Link to="/login">
          {" "}
          <h2 id={style.redirect}>login/signup</h2>
        </Link>
      </>
    );
  }
  return <>{children}</>;
}
