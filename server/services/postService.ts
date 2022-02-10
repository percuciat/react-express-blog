import PostModel from '../models/postModel';
import {v4} from 'uuid';


const postService =  {
    async create(title: string, content: string) {
        const _uniqId = v4();
        const post = await PostModel.findOne({title});
        console.log('service--', post)
        if (post) return 'Error';
        const dataPost = await PostModel.create({_uniqId, title, content});
        await dataPost.save();
        return 'ok, post Created'
    },

    async update(title: string, content: string) {
       /* const product = await Products.findByIdAndUpdate(req.params.id, {
            title, price, description, category, image
        }, { new: true })*/
        const post = await PostModel.findOne({title});
        if(!post) {
            return 'Error'
        }
        const dataPost = await PostModel.updateOne({title, content});
        return 'ok, post Updated'
    },

    async delete(title: string) {
        await PostModel.deleteOne({title});
       /* const postsAll = await PostModel.find();*/
        return 'ok, post Deleted'
    },

    async posts() {
        const postsAll = await PostModel.find();
        return postsAll
    }

}

export default postService;