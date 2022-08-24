import db from "../config";
/* import { v4 } from "uuid"; */
import {
  BadRequestError,
  ServerError,
  NotFoundError,
  DataBaseError,
} from "../helpers/errors";
import type { Error } from "sequelize";

/*

 Если в Node.JS что-то сильно не изменилось, вы в значительной степени вынуждены использовать доступ к базе данных async для масштабирования, так как все ваши запросы пользователя будут выполняться в одном потоке и синхронно ожидают, что база данных действительно снизит вашу производительность. Если один пользователь выполняет медленную операцию, всем остальным пользователям придется подождать, пока это не будет сделано.

Node.JS действительно построен для потока событий, зависящего от async, вы получите гораздо лучшую производительность, работая с ним, чем работая над ним.

*/

class PostRepository {
  repo: any;

  constructor() {
    this.repo = db.Post;
  }

  async getPosts() {
    try {
      const posts = await this.repo.findAll({
        attributes: ["id", "title", "content", "status"],
        include: ["category", "author"],
      });
      return posts;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async getPostById(postId) {
    try {
      const posts = await this.repo.findByPk(postId, {
        attributes: ["id", "title", "content", "status"],
        include: ["category", "author"],
      });
      return posts;
    } catch (error: unknown) {
      console.log("error--", error);

      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async createPost(post) {
    try {
      /* let dataPost = await this.repo.findOne({
        where: {
          title: post.title,
        },
        paranoid: false,
      });

      if (dataPost) {
        dataPost = await this.repo.restore({
          where: {
            title: post.title,
          },
        });
        return dataPost;
      } */
      // TODO: middleWare for checking
      let fadedPost = await this.repo.findOne({
        where: {
          title: post.title,
        },
        paranoid: false,
      });
      if (fadedPost) {
        throw new DataBaseError("Cannot create post");
      }
      const dataPost = await this.repo.create(post);
      return dataPost;
    } catch (error: unknown) {
      console.log("error-", error);

      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async updatePost(post, postId) {
    try {
      const data = await this.repo.update(
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
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async restorePost(postId) {
    try {
      return await this.repo.restore({
        where: {
          id: postId,
        },
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async deletePost(postId, isForce = false) {
    try {
      return await this.repo.destroy({
        where: {
          id: postId,
        },
        force: isForce,
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }
}

export default new PostRepository();
