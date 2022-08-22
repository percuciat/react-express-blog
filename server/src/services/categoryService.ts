/* import {model} from 'mongoose';
import categoryModel from '../models/categoryModel';
import {IResponse} from './types';

type TMethods<T> = {
    (...args: Array<T>): Promise<IResponse>
}

interface IcategoryService {
    categories: TMethods<undefined>
    create: TMethods<string>
    delete: TMethods<string>
}

const CategoryModel = model('Category', categoryModel);
const categoryService: IcategoryService =  {
    async categories() {
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
                message: `Server Error ${e}`,
                payload: []
            }
        }
    },

    async create(name) {
        try {
            const categoryData = await CategoryModel.findOne({name});
            if (categoryData) {
                return {
                    status: 'Error',
                    message: 'Category already exist.',
                    payload: []
                }
            } else {
                const newCategoryData = await CategoryModel.create({name});
                return {
                    status: 'OK',
                    message: 'Category has created.',
                    payload: newCategoryData
                }
            }
        } catch (e) {
            return {
                status: 'Error',
                message: `Server Error ${e}`,
                payload: []
            }
        }
    },

    async delete(_id) {
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
};

export default categoryService; */
export default {};
