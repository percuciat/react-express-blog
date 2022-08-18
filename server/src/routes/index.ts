import express from "express";
import authRouter from './authRouter'
import postRouter from './post'
import categoryRouter from './category'
const router = express.Router();

router.use('/post', postRouter)
router.use('/category', categoryRouter)
/* router.use('/users', usersRoutes)
router.use('/courses', coursesRoutes)
router.use('/students', studentsRoutes) */


export default router;
