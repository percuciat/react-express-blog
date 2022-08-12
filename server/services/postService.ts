import PostModel from "../models/sequelize/post";

type TMethods<T> = {
  (...args: Array<T>): Promise<any>;
};

interface IpostService {
  client: any;
  models: any;
  /* create: TMethods<string>;
  update: TMethods<string>;
  delete: TMethods<string>;
  posts: TMethods<{ [key: string]: any }>; */
}

/* class PostService implements IpostService {
  client: any;
  models: any;
  constructor(sequelize) {
    PostModel(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }
  async getPosts(query) {
    return "Worked!!!";
  }
}

export default PostService; */

import PostRepository from "../repository/posts";

class PostService {
  constructor() {}

  async getPosts() {
    return await PostRepository.getPosts();
  }

  async createPost(post) {
    /* if (!post) {
      throw new BadRequestError("name is required field");
    } */
    return await PostRepository.createPost(post);
  }

  async updatePost(post) {
    /* const { uid, ...rest } = post; */
    /* if (!uid) {
        throw new BadRequestError("uid is required field");
      } */
    return await PostRepository.updatePost(post);
  }

  async deletePost(postId) {
   /*  if (!postId) {
      throw new BadRequestError("uid required field");
    } */
    return await PostRepository.deletePost(postId);
  }
}

export default new PostService();

/* import PostModel from '../models/postModel';
import {v4} from 'uuid';
import {IResponse} from './types';

type TMethods<T> = {
    (...args: Array<T>): Promise<IResponse>
}

interface IpostService {
    create: TMethods<string>
    update: TMethods<string>
    delete: TMethods<string>
    posts: TMethods<{[key:string]: any}>
}

const postService: IpostService =  {
    async create(title, content, category) {
        try {
            const _uniqId = v4();
            const post = await PostModel.findOne({title});
            if (post) {
                return {
                    status: 'Error',
                    message: 'Post already exist.',
                    payload: []
                }
            } else {
                const newPost = await PostModel.create({_uniqId, title, content, category: category});
                return {
                    status: 'OK',
                    message: 'Post has created.',
                    payload: newPost
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

    async update(_id, title, content, category) {
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
                message: `Post not found for updating operation. ${e}`,
                payload: []
            }
        }
    },

    async delete(_id) {
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

    async posts(query) {
        const {count = 25, filterSort, category, page} = query;
        const mapFilterSort = {
            date: {createdAt: -1},
            title: {title: ''}
        };
        const setCategory = category ? {category: category} : {}
        
        try {
            const postsAll = await PostModel
                .find(setCategory)
                .sort(mapFilterSort[filterSort])
                .limit(+count);
                
            return {
                status: 'OK',
                message: 'Success',
                payload: postsAll
            }
        } catch (e) {
            return {
                status: 'Error',
                message: `Server Error ${e}`,
                payload: []
            }
        }
    }
};

export default postService; */
