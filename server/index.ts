import express from "express";
import dotenv from "dotenv";
import db from "./query/queries";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
/* 
TODO: закинуть в каждый роут
 */
import routes from "./routes";

// Middleware
const app = express();
/* const db = require("./queries"); */

app.use(cors());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
/* app.use('/auth', routes.authRouter); 
app.use("/category", routes.categoryRouter);
app.use("/post", routes.postRouter);*/

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
// Database
/* import './config/database' */

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
