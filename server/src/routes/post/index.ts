import express from "express";
import multer from "multer";
import PostController from "../../controllers/post";
import {
  checkCreatePost,
  checkUpdatePost,
  checkGetById,
} from "../../helpers/schemas/postValidation";
import { validatorMiddleware } from "../../middlewares/validator";
import { verifyToken } from "../../middlewares/auth";
import categoryRouter from "./category";

const postRouter = express.Router();
postRouter.get("/", PostController.getPosts);
postRouter.get(
  "/id/:id",
  validatorMiddleware(checkGetById),
  PostController.getPostById
);
postRouter.post(
  "/",
 /*  verifyToken, */
  validatorMiddleware(checkCreatePost),
  PostController.createPost
);
postRouter.get(
  "/restore/id/:id",
  /* verifyToken, */
  validatorMiddleware(checkGetById),
  PostController.restorePost
);
postRouter.put(
  "/id/:id",
  /* verifyToken, */
  validatorMiddleware(checkUpdatePost),
  PostController.updatePost
);
postRouter.delete(
  "/id/:id",
  /* verifyToken, */
  validatorMiddleware(checkGetById),
  PostController.deletePost
);

postRouter.use("/category", categoryRouter);

export default postRouter;
