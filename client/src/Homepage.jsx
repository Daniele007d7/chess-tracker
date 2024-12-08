import style from "./stylesheets-module/homepage.module.css";
import { LoginContext } from "./AuthContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeCalendar from "./HPCalendar.jsx";
import Headers from "./Headers.jsx";
import Redirect from "./Redirect.jsx";

export default function Homepage() {
  const [highlightDay, setHighlightDay] = useState([]);
  const [date, setDate] = useState(new Date());
  const [study, setStudy] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [focus, setFocus] = useState(1);
  const [tips, setTips] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();

  console.log(
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
  function increaseDate() {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  }

  function decreaseDate() {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  }

  function handleDateChange(selectedDay) {
    setDate(selectedDay);

    setShowCalendar(false);
  }

  function selectFocus(number) {
    setFocus(number);
    console.log(number);
  }

  function handleTipsChange(e) {
    setTips(e.target.value);
  }
  const isLogged = useContext(LoginContext);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date:
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate(),
        highlightDay: date.toDateString(),
        study: study,
        minutes: minutes,
        focus: focus,
        tips: tips,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("questo è data", data);

        setHighlightDay([...highlightDay, data]);
        navigate("/tips");
      });
  }

  return (
    <div>
      <Redirect>
        <h1>homepage</h1>
        <Headers />

        <form onSubmit={handleSubmit} id={style["homepage-form"]}>
          <div id={style.calendarContainer}>
            {" "}
            <HomeCalendar
              increaseDate={increaseDate}
              decreaseDate={decreaseDate}
              handleDateChange={handleDateChange}
              date={date}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
              highlightDay={highlightDay}
            />
          </div>

          <label htmlFor={style.study}>did you study chess today?</label>

          <input
            name="study"
            type="checkbox"
            onClick={() => {
              setStudy(!study);
              console.log(study);
            }}
            id={style.study}
          />
          <label htmlFor={style.minutesInput}>how much did you study?</label>

          <input
            onChange={(e) => setMinutes(e.target.value)}
            name="minutes"
            type="number"
            id={style.minutesInput}
          />
          <br />
          <label htmlFor="focus-div">what was your focus level?</label>
          <div id="focus-div">
            <input
              type="radio"
              name="focus"
              value="1"
              id="1"
              onClick={() => selectFocus(1)}
            />
            <label htmlFor="1">1</label>
            <input
              type="radio"
              name="focus"
              value="2"
              id="2"
              onClick={() => selectFocus(2)}
            />
            <label htmlFor="2">2</label>
            <input
              type="radio"
              name="focus"
              value="3"
              id="3"
              onClick={() => selectFocus(3)}
            />
            <label htmlFor="3">3</label>
            <input
              type="radio"
              name="focus"
              value="4"
              id="4"
              onClick={() => selectFocus(4)}
            />
            <label htmlFor="4">4</label>
            <input
              type="radio"
              name="focus"
              value="5"
              id="5"
              onClick={() => selectFocus(5)}
            />
            <label htmlFor="5">5</label>
          </div>

          <label name="takeaways" htmlFor={style.textarea}>
            what are your key take away from this study session?
          </label>
          <textarea
            onChange={handleTipsChange}
            id={style.textarea}
            cols="40"
          ></textarea>
          <div>
            <button id={style.submitBtn}>submit</button>
          </div>
        </form>
      </Redirect>
    </div>
  );
}
