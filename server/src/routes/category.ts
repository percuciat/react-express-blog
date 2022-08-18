import express from "express";
import CategoryController from "../controllers/category";
import {
  categorySchemaCreate,
  postSchemaDelete,
} from "../helpers/validationSchema";
import { validatorMiddleware } from "../middlewares/validator";
const router = express.Router();

router.get("/", CategoryController.getCategory);

router.post(
  "/",
  categorySchemaCreate,
  validatorMiddleware,
  CategoryController.create
);

router.delete(
  "/:uid",
  postSchemaDelete,
  validatorMiddleware,
  CategoryController.delete
);

export default router;
