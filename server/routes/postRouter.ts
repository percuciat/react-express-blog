import express from 'express';
import postController from '../controllers/postController';
const postRouter = express.Router();

postRouter.get('/', postController.index);
postRouter.post('/create', postController.create);
postRouter.put('/update/:id', postController.update);
postRouter.delete('/delete', postController.delete);


/*
router.get('/products', productCtr.getProducts)

router.get('/products/:id', productCtr.getProduct)

router.post('/products', checkProductData, productCtr.addProduct)

router.put('/products/:id', checkProductData, productCtr.updateProduct)

router.delete('/products/:id', productCtr.deleteProduct)*/

export default postRouter;