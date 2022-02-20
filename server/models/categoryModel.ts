import {Schema} from 'mongoose';

const categorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'please add category'],
    }
},{
    timestamps: false
});

export default categorySchema;
