import { useState, useEffect, useContext } from "react";
import style from "./stylesheets-module/Goals.module.css";
import Headers from "./Headers.jsx";
import { LoginContext } from "./AuthContext.jsx";
import Redirect from "./Redirect.jsx";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetch("/api/goals")
      .then((result) => result.json())
      .then((data) => {
        console.log("data", data);
        console.log(data[0].status);
        setGoals(data);
      });
  }, []);
  console.log(goals);
  function handleNewGoal() {
    setShowInput(!showInput);
  }

  const isLogged = useContext(LoginContext);
  console.log(isLogged);

  function handleChange(e) {
    setNewGoal(e.target.value);
    console.log(newGoal);
  }
  console.log(goals);

  function completeTask(index) {
    console.log(index);
    fetch(`/api/goals/${index}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setGoals(data);
      });
  }

  function handleSetGoal() {
    const data = new Date();
    fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({
        goal: newGoal,
        data: data.getFullYear() + "/" + data.getMonth() + "/" + data.getDate(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGoals(data);
        setNewGoal("");
        setShowInput(false);
      });
  }

  function handleDeleteGoal(id) {
    console.log("id", id);
    fetch(`/api/goals/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("questi sono i data del delete", data);
        setGoals(data);
      });
  }

  return (
    <>
      <Redirect>
        <h1>GOALS</h1>
        <Headers />
        <button onClick={handleNewGoal}>NEW GOAL</button>

        {showInput && (
          <div>
            <input onChange={handleChange} type="text"></input>
            <button onClick={handleSetGoal}> SET GOAL</button>
          </div>
        )}
        <div id={style.container}>
          {goals.map((goal, index) => (
            <div key={index} className={style["goal-container"]}>
              <h2 className={`${goals[index].status ? style.completed : ""}`}>
                {goal.goal}
              </h2>
              <div>
                <button
                  onClick={() => completeTask(goal.ID)}
                  className={`${style.checkBtn} `}
                >
                  ✔️
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.ID)}
                  className={style.checkBtn}
                >
                  ❌{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Redirect>
    </>
  );
}
