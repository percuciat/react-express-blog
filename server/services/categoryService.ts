import {model} from 'mongoose';
import categoryModel from '../models/categoryModel';


const CategoryModel = model('Category', categoryModel);
const categoryService =  {
    async create(category: string) {
        try {
            const categoryData = await CategoryModel.findOne({category});
            if (categoryData) {
                return {
                    status: 'Error',
                    message: 'Category already exist.',
                    payload: []
                }
            } else {
                const post = await CategoryModel.create({category});
                return {
                    status: 'OK',
                    message: 'Category has created.',
                    payload: post
                }
            }
        } catch (e) {
            return e
        }
    },

    async delete(_id: string) {
        const post = await CategoryModel.findByIdAndDelete({_id});
        if(!post) {
            return {
                status: 'Error',
                message: 'Category not found for deleting operation.',
                payload: []
            }
        } else {
            return {
                status: 'OK',
                message: 'Category has deleted.',
                payload: post
            }
        }
    },

    async categories(/*count, filter*/) {
        try {
            const categoriesAll = await CategoryModel.find();
            return {
                status: 'OK',
                message: 'Success',
                payload: categoriesAll
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Server Error',
                payload: []
            }
        }
    }
};

export default categoryService;