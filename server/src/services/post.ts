import { ServerError, NotFoundError } from "../helpers/errors";
import { InterfaceCategoryRepository } from "../repository/category";
import { InterfacePostRepository } from "../repository/post";

/* interface RepoCreator<U> {
  new (...args: ModelStatic<any>[]): U;
}

function createRepository<Y>(repo: RepoCreator<Y>, ...args: ModelStatic<any>[]): Y {
  return new repo(...args);
} */

type TypeFilterPostData = {};

class PostService {
  postRepo: InterfacePostRepository;
  categoryPostRepo: InterfaceCategoryRepository;
  constructor(postRepo, categoryPostRepo) {
    this.postRepo = postRepo;
    this.categoryPostRepo = categoryPostRepo;
  }

  async getPosts(filterData) {
    try {
      const res = await this.postRepo.getPosts(filterData);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostCategories() {
    try {
      const res = await this.categoryPostRepo.getCategories();
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostCategoryById(categoryId: string) {
    try {
      const res = await this.categoryPostRepo.getCategoryById(categoryId);
      if (!res) {
        throw new NotFoundError("Not found", "Post category not found");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async getPostById(postId: string) {
    try {
      const res = await this.postRepo.getPostById(postId);
      if (!res) {
        throw new NotFoundError("Not found", "Post not found");
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

  async updatePost(post, postId: string) {
    try {
      const res = await this.postRepo.updatePost(post, postId);
      if (!res[0]) {
        throw new NotFoundError("Not found", "Cannot update post");
      }
      return res[0];
    } catch (error: any) {
      throw error;
    }
  }

  async deletePostCategory(categoryId: string) {
    try {
      const res = await this.categoryPostRepo.deleteCategory(categoryId);
      if (!res) {
        throw new NotFoundError("Not found", "Cannot delete category");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async restorePost(postId: string) {
    try {
      const res = (await this.postRepo.restorePost(postId)) as any;
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async restoreCategory(categoryId: string) {
    try {
      const res = (await this.categoryPostRepo.restoreCategory(
        categoryId
      )) as any;
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async deletePost(postId: string, isForce: boolean) {
    try {
      const res = await this.postRepo.deletePost(postId, isForce);
      if (!res) {
        throw new NotFoundError("Not found", "Cannot delete post");
      }
      return res;
    } catch (error: any) {
      throw error;
    }
  }
}

export default PostService;
