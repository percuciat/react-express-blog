import express from 'express';
import postController from '../controllers/postController';
import postSchema from '../schemas/post/postSchema';
import { validatorSchema } from '../middlewares/validator';
const postRouter = express.Router();


/**
 * ROUTES
 */
postRouter.get('/', postController.index);

postRouter.post('/create',
    postSchema,
    validatorSchema,
    postController.create);

postRouter.put('/update',
    postSchema,
    validatorSchema,
    postController.update);

postRouter.delete('/delete', postController.delete);

export default postRouter;