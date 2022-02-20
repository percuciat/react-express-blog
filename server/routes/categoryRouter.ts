import express from 'express';
import categoryController from '../controllers/categoryController';
import categorySchema from '../schemas/category/categorySchema';
import { categoryValidatorSchema } from '../middlewares/categoryValidator';
const categoryRouter = express.Router();


/**
 * ROUTES
 */
categoryRouter.get('/', categoryController.index);

categoryRouter.post('/create',
    categorySchema,
    categoryValidatorSchema,
    categoryController.create);

categoryRouter.delete('/delete', categoryController.delete);


export default categoryRouter;