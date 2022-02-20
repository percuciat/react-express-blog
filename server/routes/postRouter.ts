import express from 'express';
import postController from '../controllers/postController';
import postSchema from '../schemas/post/postSchema';
import { postValidatorSchema } from '../middlewares/postValidator';
const postRouter = express.Router();


/**
 * ROUTES
 */
postRouter.get('/', postController.index);

postRouter.post('/create',
    postSchema,
    postValidatorSchema,
    postController.create);

postRouter.put('/update',
    postSchema,
    postValidatorSchema,
    postController.update);

postRouter.delete('/delete', postController.delete);


/*
router.get('/products', productCtr.getProducts)

router.get('/products/:id', productCtr.getProduct)

router.post('/products', checkProductData, productCtr.addProduct)

router.put('/products/:id', checkProductData, productCtr.updateProduct)

router.delete('/products/:id', productCtr.deleteProduct)*/

export default postRouter;