import express from "express";
import multer from "multer";
import PostController from "../controllers/post";
import {
  checkCreatePost,
  checkUpdatePost,
  checkCreateCategory,
  checkGetById,
} from "../helpers/validationSchema";
import { validatorMiddleware, validation } from "../middlewares/validator";
const router = express.Router();

router.get("/", PostController.getPosts);

router.get(
  "/id/:id",
  checkGetById,
  validatorMiddleware,
  PostController.getPostById
);

router.post(
  "/",
  checkCreatePost,
  validatorMiddleware,
  PostController.createPost
);

router.get(
  "/restore/id/:id",
  checkGetById,
  validatorMiddleware,
  PostController.restorePost
);

router.put(
  "/id/:id",
  checkUpdatePost,
  validatorMiddleware,
  PostController.updatePost
);

router.delete("/id/:id", checkGetById, PostController.deletePost);

router.get("/category", PostController.getPostCategories);

router.get(
  "/category/id/:id",
  checkGetById,
  validatorMiddleware,
  PostController.getPostCategoryById
);

router.post(
  "/category",
  checkCreateCategory,
  validatorMiddleware,
  PostController.createPostCategory
);

router.delete(
  "/category/id/:id",
  checkGetById,
  validatorMiddleware,
  PostController.deletePostCategory
);

export default router;
