import { BadRequestError, ServerError, NotFoundError } from "../helpers/errors";

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
    try {
      const res = await PostRepository.getPosts();
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async createPost(post) {
    try {
      const res = await PostRepository.createPost(post);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async updatePost(post, postId) {
    try {
      const res = await PostRepository.updatePost(post, postId);
      if (!res[0]) {
        throw new NotFoundError("Cannot update post");
      }
      return res[0];
    } catch (error: any) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const res = await PostRepository.deletePost(postId);
      if (!res) {
        throw new NotFoundError("Cannot delete post");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
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
