import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./stylesheets-module/Login.module.css";
import { useContext } from "react";
import { LoginContext } from "./AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(LoginContext);

  async function handleSubmition(e) {
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("login: success");

          console.log(data);
          auth.setIsLogged(data);
          navigate("/homepage");
        } else {
          console.log("non sei loggato bro");
          setWrongCredentials(true);
        }
      });
  }
  return (
    <>
      <h1>login</h1>
      <div id={style["login-container"]}>
        <form id={style["login-box"]}>
          <label htmlFor="user-input">username</label>
          <input
            type="text"
            id="user-input"
            className={style["login-input"]}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="user-password">password</label>
          <input
            type="password"
            id="user-password"
            className={style["login-input"]}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div id={style["button-container"]}>
            <button
              onClick={async (e) => {
                e.preventDefault();

                await handleSubmition(e);
              }}
              id="submit-button"
            >
              submit
            </button>
          </div>
          <Link to="/signup">
            <h2 id={style["login-signup-heading"]}> or signup </h2>
          </Link>
          {wrongCredentials && (
            <h1 id={style.wrongCredentials}>
              hai sbagliato username o password
            </h1>
          )}
        </form>
      </div>
    </>
  );
}
