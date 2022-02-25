import {Schema} from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'please add category name'],
        unique: true,
    }
},{
    timestamps: false
});

export default categorySchema;
