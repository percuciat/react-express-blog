import db from "../config";
import { DataBaseError } from "../helpers/errors";
import type { Error } from "sequelize";

class PostRepository {
  postModel: any;

  constructor() {
    this.postModel = db.Post;
  }

  async getPosts() {
    try {
      const posts = await this.postModel.findAll({
        attributes: ["id", "title", "content", "status"],
        include: ["category", "author"],
      });
      return posts;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async getPostById(postId) {
    try {
      const posts = await this.postModel.findByPk(postId, {
        attributes: ["id", "title", "content", "status"],
        include: ["category", "author"],
      });
      return posts;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async createPost(post) {
    try {
      // TODO: middleWare for checking
      let fadedPost = await this.postModel.findOne({
        where: {
          title: post.title,
        },
        paranoid: false,
      });
      if (fadedPost) {
        throw new DataBaseError("Cannot create post");
      }
      const dataPost = await this.postModel.create(post);
      return dataPost;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async updatePost(post, postId) {
    try {
      const data = await this.postModel.update(
        { ...post },
        {
          where: {
            id: postId,
          },
        }
      );
      return data;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async restorePost(postId) {
    try {
      return await this.postModel.restore({
        where: {
          id: postId,
        },
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async deletePost(postId, isForce = false) {
    try {
      return await this.postModel.destroy({
        where: {
          id: postId,
        },
        force: isForce,
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }
}

export default new PostRepository();
