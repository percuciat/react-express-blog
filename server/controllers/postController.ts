import {Request, Response} from 'express'
import postService from '../services/postService';

const postController = {
    async create(req: Request, res: Response) {
        const {title, content} = req.body;
        const postBody = await postService.create(title, content);
        if (postBody === 'Error') {
            return res.status(400).json({
                status: 'Error',
                msg: 'Post already Exist!',
            })
        }
        const newPost = {
            title, content
        };

        res.json({
            status: 'OK',
            msg: 'Post successfully created!',
            data: newPost
        })
    },
    async index(req: Request, res: Response) {
        const posts = await postService.posts();
        return posts
    },
    async update(req: Request, res: Response) {

    },
    async delete(req: Request, res: Response) {

    }
};

export default postController