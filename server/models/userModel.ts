/* import {Schema} from 'mongoose'; */

/* const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please add your name'],
        trim: true,
        maxLength: [20, 'Your name is up to 20 char']
    },
    account: {
        type: String,
        required: [true, 'please add your email or phone'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add your password'],
        trim: true,
    },
    avatar: {
        type: String,
        default: '../assets/img/cat.jpg',
    },
    role: {
        type: String,
        default: 'user'
    },
    type: {
        type: String,
        default: 'normal'
    }
}, {
    timestamps: true
});

export interface SavedUserDocument extends Document {
    account: string;
    password: string;
} */

export default {};
