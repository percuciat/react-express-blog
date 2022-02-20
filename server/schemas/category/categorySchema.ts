import {body} from "express-validator";

export default [
    body('category')
        .isLength({ min: 3 })
        .withMessage('Category must contains more than 3 letters'),
]
