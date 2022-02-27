import {Schema, model} from 'mongoose';
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
        type: Schema.Types.String,
        ref: 'Category'
    },
    author: {
        ref: userSchema
    }
},{
    timestamps: true
});

export default model('Post', postModel);