import { useEffect, useState, Fragment } from "react";
import style from "./stylesheets-module/wellDone.module.css";
import Headers from "./Headers.jsx";
import Redirect from "./Redirect.jsx";

export default function WellDone() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    function getData() {
      fetch("/api/tips")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTips([...tips, ...data]);
        });
    }
    getData();
  }, []);
  console.log(tips[0]);

  return (
    <>
      <Redirect>
        <h1>your latest tips</h1>
        <Headers />
        <h2 id={style.title}>THESE ARE YOUR LATEST KEY TAKE AWAYS</h2>

        {tips.map((tip, index) => (
          <Fragment key={index}>
            <div id={style.tipContainer}>
              <h2>{tip.responseTips}</h2>
            </div>
          </Fragment>
        ))}
      </Redirect>
    </>
  );
}
