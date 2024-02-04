import express from "express";
import "dotenv/config";
import { db } from "./adapters/db/index.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
