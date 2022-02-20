import {Request, Response} from 'express'
import categoryService from '../services/categoryService';

const categoryController = {

    async create(req: Request, res: Response) {
        try {
            const {category} = req.body;
            const {status, message, payload} = await categoryService.create(category);
            if(status === 'Error') {
                return res.status(501).json({
                    status: status,
                    message: message
                })
            } else {
                res.status(200).json({
                    status: status,
                    message: message,
                    data: payload
                })
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
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
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { _id } = req.body;
            const {status, message, payload} = await categoryService.delete(_id);
            if (status === 'Error') {
                return res.status(501).json({
                    status,
                    message,
                })
            }
            return res.status(200).json({
                status,
                message,
                data: payload
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
};

export default categoryController;