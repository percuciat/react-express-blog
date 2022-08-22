import express, { Application } from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
/* 
TODO: закинуть в каждый роут
 */
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

// Routes
/* app.use('/auth', routes.authRouter);  */
/* app.use("/category", routes.categoryRouter); */
// routes.postRouter
/* app.use("/posts", routes); */
const apiPrefix = process.env.API_BASE || "/api";
app.use(apiPrefix, routes);
//app.use("/api", () => 'alalal');
/*app.get("/users/:id", db.getUserById)
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser); */

app.get("/api", (request, response) => {
  response.send("Worked!!! API");
});

app.get("/", (request, response) => {
  response.send("Worked!!! Base URL");
});

export default app;
