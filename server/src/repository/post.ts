import { DataBaseError } from "../helpers/errors";
import type { Error } from "sequelize";
import { Author, AuthorType } from "../models/author";
import { Category, CategoryType } from "../models/category";
import { Post, PostType, PostModel } from "../models/post";

export interface InterfacePostRepository {
  getPosts(): Promise<PostModel[]>;
  getPostById(postId: string): Promise<PostModel | null>;
  createPost(postInfo: TypePostInfo): Promise<PostModel>;
  updatePost(
    postInfo: TypePostInfo,
    postId: string
  ): Promise<[affectedCount: number]>;
  restorePost(postId: string): Promise<void>;
  deletePost(postId: string, isForse: boolean): Promise<number>;
}

type TypePostInfo = {
  title: string;
  content: string;
  status: "No published" | "Published";
  categoryId: string;
  authorId: string;
};

class PostRepository {
  postModel: PostType;
  authorModel: AuthorType;
  categoryModel: CategoryType;

  constructor() {
    this.postModel = Post;
    this.authorModel = Author;
    this.categoryModel = Category;
  }

  async getPosts() {
    try {
      const posts = await this.postModel.findAll({
        attributes: ["id", "title", "content", "status"],
        include: [
          {
            model: this.authorModel,
            as: "author",
            attributes: ["id", "author_name"],
          },
          {
            model: this.categoryModel,
            as: "category",
            attributes: ["id", "category_name"],
          },
        ],
      });
      return posts;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async getPostById(postId: string) {
    try {
      const posts = await this.postModel.findByPk(postId, {
        attributes: ["id", "title", "content", "status"],
        include: [
          {
            model: this.authorModel,
            as: "author",
            attributes: ["id", "author_name"],
          },
          {
            model: this.categoryModel,
            as: "category",
            attributes: ["id", "category_name"],
          },
        ],
      });
      return posts;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async createPost(postInfo) {
    try {
      // TODO: middleWare for checking
      let fadedPost = await this.postModel.findOne({
        where: {
          title: postInfo.title,
        },
        paranoid: false,
      });
      if (fadedPost) {
        throw new DataBaseError("Cannot create post");
      }
      const dataPost = await this.postModel.create(postInfo);
      return dataPost;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async updatePost(postInfo: TypePostInfo, postId: string) {
    try {
      const data = await this.postModel.update(
        { ...postInfo },
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

  async restorePost(postId: string) {
    try {
      const result = await this.postModel.restore({
        where: {
          id: postId,
        },
      });
      return result;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async deletePost(postId: string, isForce = false) {
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
