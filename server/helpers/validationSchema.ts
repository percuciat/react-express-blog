import { body } from "express-validator";

export const postSchema = [
  body("title")
    /*.isAlphanumeric()
        .withMessage('Title should be alphanumeric')*/
    .isLength({ min: 3 })
    .withMessage("Title must contains more than 3 letters"),
  body("content")
    /* .isAlphanumeric()
        .withMessage('Title should be alphanumeric')*/
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
  /* body('category')
        .notEmpty()
        .withMessage("Enter the post's category."), */
];
