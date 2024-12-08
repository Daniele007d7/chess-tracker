import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import "./stylesheets-module/calendar.css";
import style from "./stylesheets-module/HPCalendar.module.css";

export default function HomeCalendar({
  date,
  increaseDate,
  decreaseDate,
  handleDateChange,
  setShowCalendar,
  showCalendar,
}) {
  const month = date.toLocaleString("default", { month: "long" });
  const [highlightDays, setHighlightDays] = useState([]);
  useEffect(() => {
    fetch("/api/calendar")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setHighlightDays(data);
      });
  }, []);

  useEffect(() => {
    const days = highlightDays.map((day) => {
      return new Date(day.responseDate);
    });
  }, [highlightDays]);

  /*   if (highlightDays.length === 0) {
    return <h1>sta caricando</h1>;
  } */
  return (
    <div className={`${style.date}`}>
      <div id={style["calendar-container"]}>
        <button
          type="button"
          onClick={decreaseDate}
          className={style["change-date-btn"]}
        >
          ⬅
        </button>

        <h2 id={style["h2data"]} onClick={() => setShowCalendar(!showCalendar)}>
          {date.getDate()}
          {" " + month}
          {" " + date.getFullYear()}
        </h2>
        <button
          type="button"
          onClick={() => increaseDate()}
          className={style["change-date-btn"]}
        >
          ⮕
        </button>
      </div>

      {showCalendar && (
        <Calendar
          onChange={handleDateChange}
          date={date}
          tileClassName={({ date, view }) => {
            const isHighlighted = highlightDays.some((day) => {
              if (
                new Date(day.responseDate).toDateString() ===
                new Date(date).toDateString()
              ) {
                return true;
              } else return null;
            });

            return isHighlighted ? "highlight" : null;
          }}
        />
      )}
    </div>
  );
}
