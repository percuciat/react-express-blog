import {Schema, model} from 'mongoose';
import categorySchema from './categoryModel';
import userSchema from './userModel';

const postModel = new Schema({
    title: {
        type: String,
        required: [true, 'please add title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'please add content'],
        trim: true,
    },
    category: {
        ref: categorySchema
    },
    author: {
        ref: userSchema
    }
},{
    timestamps: true
});

export default model('Post', postModel);