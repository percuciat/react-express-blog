import { connect } from "../db";
/* const logger = require("../logger/api.logger"); */

class PostRepository {
  db: any = {};

  constructor() {
    this.db = connect();
    // For Development
    /*  this.db.sequelize.sync({ force: true }).then(() => {
      console.log("----Drop and re-sync db.----");
    }); */
  }

  async getPosts() {
    try {
      const posts = await this.db.posts.findAll();
      return posts;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createPost(post) {
    try {
      const data = await this.db.posts.create(post);
      return data;
    } catch (err) {
      console.log("eror CREATE--", err);
    }
  }

  async updatePost(post) {
    try {
      const data = await this.db.posts.update(
        { ...post },
        {
          where: {
            uid: post.uid,
          },
        }
      );
      return data;
    } catch (err) {
      console.log("eror UPDATE--", err);
    }
  }

  async deletePost(postId) {
    console.log("postId DELETE--", postId);
    try {
      const data = await this.db.posts.destroy({
        where: {
          uid: postId,
        },
      });
      return data;
    } catch (err) {
      console.log("eror DELETE--", err);
    }
  }
}

export default new PostRepository();
