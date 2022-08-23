import express, { Application } from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

const compression = require("compression");
const app: Application = express();

dotenv.config();
// Middleware
app.use(cors());
/* app.use(compression()); */
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

const apiPrefix = process.env.API_BASE || "/api";

app.use(apiPrefix, routes);

// TODO: 404
app.use((req, res, next) => {
  res.status(404).json({
    error: 404,
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

// Routes
app.get("/api", (request, response) => {
  response.send("Worked!!! API");
});
app.get("/", (request, response) => {
  response.send("Worked!!! Base URL");
});

export default app;
