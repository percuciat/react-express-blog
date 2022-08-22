/* import { v4 } from "uuid"; */

/* import { connect } from "../config";

import { BadRequestError, ServerError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";
import Post from "../models/post";
import Category from "../models/category";

class PostRepository {
  db: any;

  constructor() {
    this.db = {};
    connect()
      .then((res) => {
        this.db = res;
        Promise.all([
          Post(this.db.sequelize),
          Category(this.db.sequelize),
        ]).then((resSum) => {
          // TODO: вынести отдельно

          this.db.posts = resSum[0];
          this.db.category = resSum[1];
        });
        return res;
      })
      .catch((e) => console.log("eror CATCH connects:", e));
  }

  async getPosts() {
    try {
      const posts = await this.db.posts.findAll();
      return posts;
    } catch (error: unknown) {
      console.log("error--", error);

      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async createPost(post) {
    try {
      const data = await this.db.posts.create(post);
      return data;
    } catch (error: unknown) {
      console.log("error-", error);

      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async updatePost(post, postId) {
    try {
      const data = await this.db.posts.update(
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
      return await this.db.posts.destroy({
        where: {
          uid: postId,
        },
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }
} */

export default {};
