import { connect } from "../db";
import { v4 } from "uuid";

class PostRepository {
  db: any = {};

  constructor() {
    this.db = connect();
    // this.redisDB = connectRedis();
    // For Development
    /*  this.db.sequelize.sync({ force: true }).then(() => {
      console.log("----Drop and re-sync db.----");
    }); */
  }

  async getPosts() {
    const posts = await this.db.posts.findAll();
    return posts;
  }

  async createPost(post) {
    const _uniqId = v4();
    post.uid = _uniqId;

    const data = await this.db.posts.create(post);
    return data;
  }

  async updatePost(post) {
    const data = await this.db.posts.update(
      { ...post },
      {
        where: {
          uid: post.uid,
        },
      }
    );
    return data;
  }

  async deletePost(postId) {
    const data = await this.db.posts.destroy({
      where: {
        uid: postId,
      },
    });
    console.log('DELETE data--', data);
    /*  if (!postId) {
      throw new BadRequestError("uid required field");
    } */
    return data;
  }
}

export default new PostRepository();
