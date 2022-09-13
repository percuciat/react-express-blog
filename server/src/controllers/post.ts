import { Request, Response } from "express";
import PostService from "../services/post";
import PostRepository from "../repository/post";
import CategoryRepository from "../repository/category";
import { responseSuccess, responseError } from "../helpers/responses";

const service = new PostService(PostRepository, CategoryRepository);

const postController = {
  async getPosts(req: Request, res: Response) {
    try {
      const filterData = req.query;
      const posts = await service.getPosts(filterData);
      return responseSuccess(res, posts);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async getPostCategories(req: Request, res: Response) {
    try {
      const categories = await service.getPostCategories();
      return responseSuccess(res, categories);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async getPostById(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const posts = await service.getPostById(postId);
      return responseSuccess(res, posts);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async getPostCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const category = await service.getPostCategoryById(categoryId);
      return responseSuccess(res, category);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async createPost(req: Request, res: Response) {
    try {
      const post = req.body;
      const resCreate = await service.createPost(post);
      return responseSuccess(res, resCreate);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async createPostCategory(req: Request, res: Response) {
    try {
      const categoryInfo = req.body;
      const resCreate = await service.createPostCategory(categoryInfo);
      return responseSuccess(res, resCreate);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const newPost = req.body;
      const resPost = await service.updatePost(newPost, postId);
      return responseSuccess(res, resPost);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const isForce = Boolean(req.params.flag);
      const resDelete = await service.deletePost(postId, isForce);
      return responseSuccess(res, resDelete);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async restorePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const resRestore = await service.restorePost(postId);
      return responseSuccess(res, resRestore);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async restoreCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const resRestore = await service.restoreCategory(categoryId);
      return responseSuccess(res, resRestore);
    } catch (error: any) {
      return responseError(res, error);
    }
  },

  async deletePostCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const resDelete = await service.deletePostCategory(categoryId);
      return responseSuccess(res, resDelete);
    } catch (error: any) {
      return responseError(res, error);
    }
  },
};
export default postController;
