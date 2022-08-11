import { Request, Response } from "express";
import PostService from "../services/postService";

const postController = {
  async getPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getPosts();

      return res.status(200).json({ data: posts });
    } catch (error: any) {
      //throw new BadRequestError(error);
      console.log("errr--", error);
      /* return res.status(400).json({
            status: 'Error',
            errorData: [{
                message: error.message
            }]
        }) */
    }
  },

  async createPost(req: Request, res: Response) {
    const post = req.body;
    try {
      const resCreate = await PostService.createPost(post);
      return res.status(200).json({ data: resCreate });
    } catch (error: any) {
      console.log("errr--", error);
    }
  },

  async updatePost(req: Request, res: Response) {
    const newPost = req.body;
    try {
      const resPost = await PostService.updatePost(newPost);
      return res.status(200).json({ data: resPost });
    } catch (error: any) {
      console.log("errr--", error);
    }
  },

  async deletePost(req: Request, res: Response) {
    const postId = req.params.uid;
    try {
      const resDelete = await PostService.deletePost(postId);
      return res.status(200).json({ data: resDelete });
    } catch (error: any) {
      console.log("errr--", error);
    }
  },
};
export default postController;
