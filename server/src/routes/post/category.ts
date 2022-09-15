import express from "express";
import PostController from "../../controllers/post";
import { validatorMiddleware } from "../../middlewares/validator";
import { verifyToken } from "../../middlewares/auth";
import {
  checkCreatePostCategory,
  checkGetById,
} from "../../helpers/schemas/postValidation";

const categoryRouter = express.Router({ mergeParams: true });
categoryRouter.get("/", PostController.getPostCategories);
categoryRouter.get(
  "/id/:id",
  validatorMiddleware(checkGetById),
  PostController.getPostCategoryById
);

categoryRouter.get(
  "/restore/id/:id",
  /* verifyToken, */
  validatorMiddleware(checkGetById),
  PostController.restoreCategory
);

categoryRouter.post(
  "/",
  /* verifyToken, */
  validatorMiddleware(checkCreatePostCategory),
  PostController.createPostCategory
);
categoryRouter.delete(
  "/id/:id",
  /* verifyToken, */
  validatorMiddleware(checkGetById),
  PostController.deletePostCategory
);

export default categoryRouter;
