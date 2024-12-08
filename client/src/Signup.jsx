import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./stylesheets-module/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSubmition(e) {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("questi sono i dati del signup ", data);
        navigate("/login");
      });
  }
  return (
    <>
      <h1>{"sign up"}</h1>
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
            <Link to="/homepage">
              <button
                onClick={(e) => {
                  handleSubmition(e);
                }}
              >
                submit
              </button>
            </Link>
          </div>

          <Link to="/login">
            <h2 id={style["login-signup-heading"]}> or login </h2>
          </Link>
        </form>
      </div>
    </>
  );
}
