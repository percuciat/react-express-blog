import express from "express";
import multer from "multer";
import PostController from "../controllers/post";
import {
  checkCreatePost,
  checkUpdatePost,
  checkCreatePostCategory,
  checkGetById,
} from "../helpers/schemas/postValidation";
import { validatorMiddleware } from "../middlewares/validator";
import { verifyToken } from "../middlewares/auth";
const router = express.Router();

router.get("/", PostController.getPosts);

router.get(
  "/id/:id",
  validatorMiddleware(checkGetById),
  PostController.getPostById
);

router.post(
  "/",
  verifyToken,
  validatorMiddleware(checkCreatePost),
  PostController.createPost
);

router.get(
  "/restore/id/:id",
  verifyToken,
  validatorMiddleware(checkGetById),
  PostController.restorePost
);

router.put(
  "/id/:id",
  verifyToken,
  validatorMiddleware(checkUpdatePost),
  PostController.updatePost
);

router.delete(
  "/id/:id",
  verifyToken,
  validatorMiddleware(checkGetById),
  PostController.deletePost
);

router.get("/category", PostController.getPostCategories);

router.get(
  "/category/id/:id",
  validatorMiddleware(checkGetById),
  PostController.getPostCategoryById
);

router.post(
  "/category",
  verifyToken,
  validatorMiddleware(checkCreatePostCategory),
  PostController.createPostCategory
);

router.delete(
  "/category/id/:id",
  verifyToken,
  validatorMiddleware(checkGetById),
  PostController.deletePostCategory
);

export default router;
