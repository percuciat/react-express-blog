import express from 'express';
import categoryController from '../controllers/categoryController';
import categorySchema from '../schemas/category/categorySchema';
import { validatorSchema } from '../middlewares/validator';
const categoryRouter = express.Router();


/**
 * ROUTES
 */
categoryRouter.get('/', categoryController.index);

categoryRouter.post('/create',
    categorySchema,
    validatorSchema,
    categoryController.create);

categoryRouter.delete('/delete', categoryController.delete);


export default categoryRouter;