import {Request, Response} from 'express'
import postService from '../services/postService';

const postController = {
    async create(req: Request, res: Response) {
        const {title, content} = req.body;
        console.log('title--', title)
        console.log('content--', content)
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

        res.status(200).json({
            status: 'OK',
            data: newPost
        })
    },
    async index(req: Request, res: Response) {
        const posts = await postService.posts();
        return res.status(200).json({
            status: 'OK',
            data: posts
        })
    },
    async update(req: Request, res: Response) {
        try {
            const { title, content } = req.body;
            const updatedPost = await postService.update(title, content);
           /* const product = await Products.findByIdAndUpdate(req.params.id, {
                title, price, description, category, image
            }, { new: true }) */

            return res.status(200).json({
                status: 'OK',
                data: updatedPost
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    async delete(req: Request, res: Response) {
        /*try {

            const product = await Products.findByIdAndDelete(req.params.id)

            if(!product)
                return res.status(404).json({msg: 'This product does not exist.'})

            return res.status(200).json({msg: 'Delete Success!'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }*/
    }
};

export default postController