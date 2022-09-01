import express from "express";
import authRouter from "./auth";
import postRouter from "./post";
const router = express.Router();

router.use("/post", postRouter);
router.use("/auth", authRouter);

export default router;
