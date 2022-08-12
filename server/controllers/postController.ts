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

  async createPost(req: Request, res: Response) {
    const post = req.body;
    try {
      const resCreate = await PostService.createPost(post);
      return responseSuccess(res, resCreate);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async updatePost(req: Request, res: Response) {
    const newPost = req.body;
    try {
      const resPost = await PostService.updatePost(newPost);
      return responseSuccess(res, resPost);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async deletePost(req: Request, res: Response) {
    const postId = req.params.uid;
    try {
      const resDelete = await PostService.deletePost(postId);
      return responseSuccess(res, resDelete);
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
};
export default postController;
