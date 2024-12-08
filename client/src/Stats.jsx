import Redirect from "./Redirect.jsx";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import style from "./stylesheets-module/Stats.module.css";
import Headers from "./Headers.jsx";

export default function Stats() {
  const [focus, setFocus] = useState([]);
  const [min, setMin] = useState([]);
  useEffect(() => {
    fetch("/api/stats")
      .then((result) => result.json())
      .then((data) => {
        console.log(data);

        data.sort(
          (a, b) => new Date(a.responseDate) - new Date(b.responseDate)
        );
        console.log("sorted data", data);
        const focusData = data.map((line) => ({
          data:
            new Date(line.responseDate).getDate() +
            "/" +
            (new Date(line.responseDate).getMonth() + 1),
          focus: line.responseFocus,
        }));

        const minutesData = data.map((line) => ({
          data:
            new Date(line.responseDate).getDate() +
            "/" +
            (new Date(line.responseDate).getMonth() + 1),
          minutes: line.responseMinutes,
        }));
        console.log("minutes data", minutesData);

        setFocus(focusData);
        setMin(minutesData);
      });
  }, []);

  /*   if (focus.length === 0 || min.length === 0) {
    return <h1>sta caricando</h1>;
  } */
  return (
    <>
      <Redirect>
        {" "}
        <h1>stats</h1>
        <Headers />
        <h2>focus</h2>
        <div id={style.graph}>
          <Line
            data={{
              labels: focus.map((data) => data.data),
              datasets: [
                {
                  label: "focus",
                  data: focus.map((data) => data.focus),
                },
              ],
            }}
          />
          <Line
            data={{
              labels: min.map((data) => data.data),
              datasets: [
                {
                  label: "study-session",
                  data: min.map((data) => data.minutes),
                  borderColor: "#0B6623",
                  backgroundColor: "#dad7fa",
                },
              ],
            }}
          />
        </div>
      </Redirect>
    </>
  );
}
