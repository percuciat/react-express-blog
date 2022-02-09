import express from 'express';
import postController from '../controllers/postController';
const postRouter = express.Router();

postRouter.get('/', postController.index);
postRouter.post('/create', postController.create);
postRouter.put('/update', postController.update);
postRouter.delete('/delete', postController.delete);


export default postRouter;