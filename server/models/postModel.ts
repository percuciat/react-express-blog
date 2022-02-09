import {Schema, model} from 'mongoose';

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
    }
},{
    timestamps: true
});

export default model('Post', postModel);