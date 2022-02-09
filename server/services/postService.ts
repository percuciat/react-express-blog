import PostModel from '../models/postModel';
import uuid from 'uuid';


const postService =  {
    async create(title: string, content: string) {
        const _uniqId = uuid.v4();
        const post = await PostModel.findOne({title})
        if (post) return 'Error';
        const dataPost = await PostModel.create({_uniqId, title, content});
        await dataPost.save();
        return 'ok, post Created'
    },

    async update() {

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