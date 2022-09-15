import { ServerError } from "../helpers/errors";
import type { Error } from "sequelize";
import { Author, AuthorType } from "../models/author";
import { Category, CategoryType } from "../models/category";
import { Post, PostType, PostModel, EnumPostStatus } from "../models/post";

export interface InterfacePostRepository {
  getPosts(filterData): Promise<PostModel[]>;
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
  status: EnumPostStatus;
  updatedby: string;
  category_id: number;
  author_id: number;
};

type TypePostFilterData = {
  category?: number;
  order?: [string, string];
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

  async getPosts(filterData: TypePostFilterData) {
    try {
      const filterCategory = filterData.category
        ? { id: filterData.category }
        : {};
      const filterOrder = filterData.order?.length
        ? filterData.order
        : (["id", "DESC"] as [string, string]);
      const posts = await this.postModel.findAll({
        attributes: ["id", "title", "content", "status", "createdAt"],
        order: [filterOrder],
        // { offset: 5, limit: 5 }
        include: [
          {
            model: this.authorModel,
            as: "post_author",
            attributes: ["id", "author_name"],
          },
          {
            model: this.categoryModel,
            as: "post_category",
            attributes: ["id", "category_name"],
            where: filterCategory,
          },
        ],
      });
      return posts;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async getPostById(postId: string) {
    try {
      const posts = await this.postModel.findByPk(postId, {
        attributes: ["id", "title", "content", "status", "createdAt"],
        include: [
          {
            model: this.authorModel,
            as: "post_author",
            attributes: ["id", "author_name"],
          },
          {
            model: this.categoryModel,
            as: "post_category",
            attributes: ["id", "category_name"],
          },
        ],
      });
      return posts;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async createPost(postInfo: TypePostInfo) {
    try {
      let fadedPost = await this.postModel.findOne({
        where: {
          title: postInfo.title,
        },
        paranoid: false,
      });
      if (fadedPost) {
        throw new ServerError(
          "Sequelize",
          "Cannot create post. Check archived posts."
        );
      }
      const dataPost = await this.postModel.create(postInfo);
      return dataPost;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
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
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async restorePost(postId: string) {
    try {
      let fadedPost = await this.postModel.findOne({
        where: {
          id: postId,
        },
        attributes: ["deletedAt"],
        paranoid: false,
      });

      if (!fadedPost?.deletedAt) {
        throw new ServerError(
          "Sequelize",
          "Cannot restore post. Maybe it is not deleted or existed."
        );
      }

      const result = await this.postModel.restore({
        where: {
          id: postId,
        },
      });
      return result;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
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
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }
}

export default new PostRepository();
