import {Request, Response} from 'express'
import postService from '../services/postService';

const postController = {
    async create(req: Request, res: Response) {
        try {
            const {title, content, category} = req.body;
            const {status, message, payload} = await postService.create(title, content, category);
            if(status === 'Error') {
                return res.status(400).json({
                    status: status,
                    errorData: [{
                        message: message
                    }]
                })
            } else {
                res.status(200).json({
                    status: status,
                    message: message,
                    data: payload
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }

    },
    async index(req: Request, res: Response) {
        try {
            const {count, filter, category} = req.query;
            const {status, message, payload} = await postService.posts(count, filter, category);
            return res.status(200).json({
                status,
                message,
                data: payload
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const {_id, title, content, category } = req.body;
            const {status, message, payload} = await postService.update(_id, title, content, category);

            if(status === 'Error') {
                return res.status(400).json({
                    status: status,
                    errorData: [{
                        message: message
                    }]
                })
            } else {
                res.status(200).json({
                    status: status,
                    message: message,
                    data: payload
                })
            }
        } catch (error: any) {
            return res.status(500).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const { _id } = req.body;
            const {status, message, payload} = await postService.delete(_id);
            if (status === 'Error') {
                return res.status(400).json({
                    status: status,
                    errorData: [{
                        message: message
                    }]
                })
            }
            return res.status(200).json({
                status,
                message,
                data: payload
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }
    }
};

export default postController