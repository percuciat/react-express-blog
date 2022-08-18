import express from "express";
import multer from "multer";
import PostController from "../controllers/post";
import {
  postSchemaCreate,
  postSchemaUpdate,
  postSchemaDelete,
} from "../helpers/validationSchema";
import { validatorMiddleware } from "../middlewares/validator";
const router = express.Router();

/**
 * ROUTES
 */

/*  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './assets/uploads/')
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      callback(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5,
}, }); */

router.get("/", PostController.getPosts);

router.post(
  "/",
  postSchemaCreate,
  validatorMiddleware,
  PostController.createPost
);

router.put(
  "/:uid",
  postSchemaUpdate,
  validatorMiddleware,
  PostController.updatePost
);

router.delete(
  "/:uid",
  postSchemaDelete,
  validatorMiddleware,
  PostController.deletePost
);

export default router;
