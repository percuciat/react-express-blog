import { body, check } from "express-validator";

export const postSchemaCreate = [
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
  body("createdby")
    .isLength({ min: 5 })
    .withMessage("Author must contains more than 5 letters"),
  /* body('category')
        .notEmpty()
        .withMessage("Enter the post's category."), */
];

export const postSchemaUpdate = [
  /* body("uid").notEmpty().withMessage("uid must be completed"), */
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must contains more than 3 letters"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
];

export const postSchemaDelete = [
  check("uid").notEmpty().withMessage("uid must be completed in request"),
];

export const categorySchemaCreate = [
  body("title")
    /*.isAlphanumeric()
        .withMessage('Title should be alphanumeric')*/
    .isLength({ min: 3 })
    .withMessage("Title must contains more than 3 letters"),
];

/* body('category')
.isLength({ min: 3 })
.withMessage('Category must contains more than 3 letters'), */
