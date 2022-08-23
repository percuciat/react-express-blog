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

import PostRepository from "../repository/post";
import CategoryRepository from "../repository/category";

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

  async getPostCategories() {
    try {
      const res = await CategoryRepository.getCategories();
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostCategoryById(categoryId) {
    try {
      const res = await CategoryRepository.getCategoryById(categoryId);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const res = await PostRepository.getPostById(postId);
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

  async createPostCategory(categoryInfo) {
    try {
      const res = await CategoryRepository.createCategory(categoryInfo);
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

  async deletePostCategory(categoryId) {
    try {
      const res = await CategoryRepository.deleteCategory(categoryId);
      if (!res) {
        throw new NotFoundError("Cannot delete category");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async restorePost(postId) {
    try {
      const res = await PostRepository.restorePost(postId);
      if (!res) {
        throw new NotFoundError("Cannot restore post");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async deletePost(postId, isForce) {
    try {
      const res = await PostRepository.deletePost(postId, isForce);
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
