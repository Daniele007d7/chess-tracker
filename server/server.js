import express from "express";
import mysql from "mysql2/promise";
import session from "express-session";
import "dotenv/config";

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    resave: false, // sessione non si salva se non c'è nessuna modifica
    saveUninitialized: false, // sessione si salva solo se contiene dati
    secret: "chiaveSegreta",
  })
);

// connecting to the db
const connection = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
});

// /api route
app.get("/api", (req, res) => {
  console.log(req.session.authorized);
  res.json(giocatori);
});

app.post("/api/signup", async (req, res) => {
  try {
    res.json(req.body);

    const [results] = await connection.query(
      "INSERT INTO users (name, password) VALUES(? , ?)",
      [req.body.username, req.body.password]
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const [results] = await connection.query(
      "SELECT * from users where name = ? AND password = ?",
      [req.body.username, req.body.password]
    );

    if (results.length === 1) {
      req.session.authorized = true;
      req.session.userId = results[0].id;
      res.json(req.session.authorized);
    } else {
      req.session.authorized = false;
      res.json(req.session.authorized);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/auth", (req, res) => {
  if (req.session.authorized) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.get("/api/tips", async (req, res) => {
  const [result] = await connection.query(
    "SELECT responseTips FROM responses WHERE LENGTH(responseTips) >= 1 AND userID = ? ORDER BY responseDate DESC  LIMIT 7",
    [req.session.userId]
  );
  console.log(result);
  res.json(result);
});

app.post("/api/submit", async (req, res) => {
  try {
    res.json(req.body.highlightDay);

    const [responses] = await connection.query(
      "INSERT INTO responses (userID, responseDate, responseStudy, responseMinutes, responseFocus, responseTips) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.session.userId,
        req.body.date,
        req.body.study,
        req.body.minutes,
        req.body.focus,
        req.body.tips,
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/calendar", async (req, res) => {
  const [result] = await connection.query(
    "SELECT responseDate FROM responses WHERE userID = ?",
    [req.session.userId]
  );
  res.json(result);
});

app.get("/api/goals", async (req, res) => {
  const [result] = await connection.query(
    "SELECT ID , goal, status  FROM goals WHERE userID = ?",
    [req.session.userId]
  );

  res.json(result);
});

app.post("/api/goals", async (req, res) => {
  console.log("questa è la req.body.goal", req.body.goal);
  const [result] = await connection.query(
    "INSERT INTO goals (userID, data, goal) VALUES(?, ?, ?)",
    [req.session.userId, req.body.data, req.body.goal]
  );
  const [goals] = await connection.query(
    "SELECT ID, goal FROM goals WHERE userID = ?",
    [req.session.userId]
  );
  res.json(goals);
});

app.put("/api/goals/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const [result] = await connection.query(
    "UPDATE goals SET status = CASE status WHEN 0 THEN 1 WHEN 1 THEN 0 END WHERE ID = ?",
    [id]
  );

  const [goals] = await connection.query(
    "SELECT * FROM goals WHERE userID = ?",
    [req.session.userId]
  );
  console.log(goals);
  res.json(goals);
});

app.delete("/api/goals/:id", async (req, res) => {
  const id = req.params.id;

  const [result] = await connection.query("DELETE FROM goals WHERE ID = ?", [
    id,
  ]);

  const [goals] = await connection.query(
    "SELECT ID, goal FROM goals WHERE userID = ?",
    [req.session.userId]
  );

  res.json(goals);
});

app.get("/api/stats", async (req, res) => {
  const [result] = await connection.query(
    "SELECT responseDate, responseMinutes, responseFocus FROM responses WHERE userID = ?",
    [req.session.userId]
  );
  res.json(result);
});

// app listening
app.listen(3000, () => console.log("app listening on port 3000"));
