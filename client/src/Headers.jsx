import style from "./stylesheets-module/homepage.module.css";
import { Link } from "react-router-dom";

export default function Headers() {
  return (
    <>
      <div id={style.detail}>
        <div id={style.headersContainer}>
          <Link to="/goals">
            {" "}
            <h1 className={style["headers-title"]}>goals</h1>
          </Link>

          <Link to="/homepage">
            {" "}
            <h1 className={style["headers-title"]}>homepage</h1>
          </Link>

          <Link to="/tips">
            {" "}
            <h1 className={style["headers-title"]}>tips</h1>
          </Link>
          <Link to="/stats">
            {" "}
            <h1 className={style["headers-title"]}>stats</h1>
          </Link>
        </div>
      </div>
    </>
  );
}
