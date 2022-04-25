import {Request, Response} from 'express'
import categoryService from '../services/categoryService';

const categoryController = {

    async create(req: Request, res: Response) {
        try {
            const {category: name} = req.body;
            const {status, message, payload} = await categoryService.create(name);
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
            return res.status(400).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }

    },

    async index(req: Request, res: Response) {
        try {
           /* const {count, filter} = req.query;*/
            const {status, message, payload} = await categoryService.categories(/*count, filter*/);
            return res.status(200).json({
                status,
                message,
                data: payload
            })
        } catch (error: any) {
            return res.status(400).json({
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
            const {status, message, payload} = await categoryService.delete(_id);
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
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                errorData: [{
                    message: error.message
                }]
            })
        }
    }
};

export default categoryController;