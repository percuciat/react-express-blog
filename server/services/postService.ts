import PostModel from '../models/postModel';
import {v4} from 'uuid';

interface IResponse {
    status: 'Error' | 'OK',
    message: string,
    payload: any
}
interface ICreate {
    (count: number | undefined, filter: string | undefined): Promise<IResponse>
}

const postService =  {
    async create(title: string, content: string, category: string) {
        try {
            const _uniqId = v4();
            const post = await PostModel.findOne({title});
            console.log('category SERVICE--', category);
            if (post) {
                return {
                    status: 'Error',
                    message: 'Post already exist.',
                    payload: []
                }
            } else {
                const newPost = await PostModel.create({_uniqId, title, content, category: category});
                console.log('new Post--', newPost);
                return {
                    status: 'OK',
                    message: 'Post has created.',
                    payload: newPost
                }
            }
        } catch (e) {
            return {
                status: 'Error',
                message: e,
                payload: []
            }
        }
    },

    async update(_id: string, title: string, content: string, category: string) {
        try {
            const newPost = await PostModel.findByIdAndUpdate({_id}, {title, content, category}, {new: true});
            return {
                status: 'OK',
                message: 'Post has updated.',
                payload: newPost
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Post not found for updating operation.',
                payload: []
            }
        }
    },

    async delete(_id: string) {
        const post = await PostModel.findByIdAndDelete({_id});
        if(!post) {
            return {
                status: 'Error',
                message: 'Post not found for deleting operation.',
                payload: []
            }
        } else {
            return {
                status: 'OK',
                message: 'Post has deleted.',
                payload: post
            }
        }
    },

    async posts(count, filter, category) {
        try {
            const postsAll = await PostModel.find(category ? {category: category} : {})
                .limit(count || 10)
                .sort({title: filter || 'asc'});
            return {
                status: 'OK',
                message: 'Success',
                payload: postsAll
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

export default postService;