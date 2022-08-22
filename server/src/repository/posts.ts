import { connect } from "../config";
/* import { v4 } from "uuid"; */
import { BadRequestError, ServerError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";

/*

 Если в Node.JS что-то сильно не изменилось, вы в значительной степени вынуждены использовать доступ к базе данных async для масштабирования, так как все ваши запросы пользователя будут выполняться в одном потоке и синхронно ожидают, что база данных действительно снизит вашу производительность. Если один пользователь выполняет медленную операцию, всем остальным пользователям придется подождать, пока это не будет сделано.

Node.JS действительно построен для потока событий, зависящего от async, вы получите гораздо лучшую производительность, работая с ним, чем работая над ним.

*/

// Article
class PostRepository {
  repo: any;

  constructor() {
    this.repo = {};
    connect()
      .then((res) => {
        console.log("--connection repo--");
        this.repo = res.Post;
        return res;
      })
      .catch((e) => console.log("error CATCH connects:", e));

    // this.redisDB = connectRedis();
    // For Development
  }

  async getPosts() {
    try {
      const posts = await this.repo.findAll({
        attributes: ['title', 'content', 'createdby'],
        include: { association: 'article_category' }
      });
      return posts;
    } catch (error: unknown) {
      console.log("error--", error);

      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async createPost(post) {
    try {
      const data = await this.repo.create(post);
      return data;
    } catch (error: unknown) {
      console.log("error-", error);

      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async updatePost(post, postId) {
    try {
      const data = await this.repo.update(
        { ...post },
        {
          where: {
            uid: postId,
          },
        }
      );
      return data;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async deletePost(postId) {
    try {
      return await this.repo.destroy({
        where: {
          uid: postId,
        },
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }
}

export default new PostRepository();
