import express from "express";
import dotenv from "dotenv";
import { initDB, sql } from "./config/db.js";
import activitiesRoute from "./routes/activitiesRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;


app.get("/", (req, res) => {
  res.send("Welcome to the Financial Activity App API!");
});

app.use("/api/activities", activitiesRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
