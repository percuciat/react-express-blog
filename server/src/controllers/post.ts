import { Request, Response } from "express";
import PostService from "../services/postService";
import { responseSuccess, responseError } from "../helpers/responses";

const postController = {
  async getPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getPosts();
      return responseSuccess(res, posts);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async getPostCategories(req: Request, res: Response) {
    try {
      const categories = await PostService.getPostCategories();
      return responseSuccess(res, categories);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async getPostById(req: Request, res: Response) {
    const postId = req.params.id;
    try {
      const posts = await PostService.getPostById(postId);
      return responseSuccess(res, posts);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async getPostCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const category = await PostService.getPostCategoryById(categoryId);
      return responseSuccess(res, category);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async createPost(req: Request, res: Response) {
    try {
      const post = req.body;
      const resCreate = await PostService.createPost(post);
      return responseSuccess(res, resCreate);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async createPostCategory(req: Request, res: Response) {
    try {
      const categoryInfo = req.body;
      const resCreate = await PostService.createPostCategory(categoryInfo);
      return responseSuccess(res, resCreate);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const newPost = req.body;
      const resPost = await PostService.updatePost(newPost, postId);
      return responseSuccess(res, resPost);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const isForce = req.params.flag;
      const resDelete = await PostService.deletePost(postId, isForce);
      return responseSuccess(res, resDelete);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async restorePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const resRestore = await PostService.restorePost(postId);
      return responseSuccess(res, resRestore);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async deletePostCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const resDelete = await PostService.deletePostCategory(categoryId);
      return responseSuccess(res, resDelete);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
};
export default postController;
