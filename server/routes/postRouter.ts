import express from "express";
import multer from "multer";
import PostController from "../controllers/postController";
import { postSchema } from "../helpers/validationSchema";
import { validatorMiddleware } from "../middlewares/validator";
const postRouter = express.Router();

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

postRouter.get("/", PostController.getPosts);

postRouter.post(
  "/",
  postSchema,
  validatorMiddleware,
  /*  upload.single('image'), */
  PostController.createPost
);

postRouter.put("/", postSchema, validatorMiddleware, PostController.updatePost);

postRouter.delete("/:uid", PostController.deletePost);

export default postRouter;
