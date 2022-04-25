import express from 'express';
import multer from 'multer';
import postController from '../controllers/postController';
import postSchema from '../schemas/post/postSchema';
import { validatorSchema } from '../middlewares/validator';
const postRouter = express.Router();

/**
 * ROUTES
 */

 const storage = multer.diskStorage({
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
}, });

postRouter.get('/', postController.index);

postRouter.post('/create',
    postSchema,
    validatorSchema,
    upload.single('image'),
    postController.create);

postRouter.put('/update',
    postSchema,
    validatorSchema,
    postController.update);

postRouter.delete('/delete', postController.delete);

export default postRouter;