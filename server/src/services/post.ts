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

class PostService {
  postRepo: any;
  categoryPostRepo: any;
  constructor(postRepo, categoryPostRepo) {
    this.postRepo = postRepo;
    this.categoryPostRepo = categoryPostRepo;
  }

  async getPosts() {
    try {
      const res = await this.postRepo.getPosts();
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostCategories() {
    try {
      const res = await this.postRepo.getCategories();
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostCategoryById(categoryId) {
    try {
      const res = await this.categoryPostRepo.getCategoryById(categoryId);
      if (!res) {
        throw new NotFoundError("Post category not found");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const res = await this.postRepo.getPostById(postId);
      if (!res) {
        throw new NotFoundError("Post not found");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async createPost(post) {
    try {
      const res = await this.postRepo.createPost(post);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async createPostCategory(categoryInfo) {
    try {
      const res = await this.categoryPostRepo.createCategory(categoryInfo);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async updatePost(post, postId) {
    try {
      const res = await this.postRepo.updatePost(post, postId);
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
      const res = await this.categoryPostRepo.deleteCategory(categoryId);
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
      const res = await this.postRepo.restorePost(postId);
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
      const res = await this.postRepo.deletePost(postId, isForce);
      if (!res) {
        throw new NotFoundError("Cannot delete post");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }
}

export default PostService;
