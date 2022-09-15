import { ServerError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";
import { Category, CategoryType, CategoryModel } from "../models/category";
import { Author, AuthorType } from "../models/author";

export interface InterfaceCategoryRepository {
  getCategories(): Promise<CategoryModel[]>;
  getCategoryById(categoryId: string): Promise<CategoryModel | null>;
  createCategory(categoryInfo: TypeCategoryInfo): Promise<CategoryModel>;
  restoreCategory(categoryId: string): Promise<void>;
  deleteCategory(categoryId: string): Promise<number>;
}

type TypeCategoryInfo = {
  category_name: string;
  author_id: number;
};

class CategoryRepository implements InterfaceCategoryRepository {
  categoryModel: CategoryType;
  authorModel: AuthorType;

  constructor() {
    this.categoryModel = Category;
    this.authorModel = Author;
  }

  async getCategories() {
    try {
      const categories = await this.categoryModel.findAll({
        attributes: ["id", "category_name"],
        include: {
          model: this.authorModel,
          as: "category_author",
          attributes: ["id", "author_name"],
        },
      });
      return categories;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async getCategoryById(categoryId: string) {
    try {
      const category = await this.categoryModel.findByPk(categoryId, {
        attributes: ["id", "category_name"],
        include: {
          model: this.authorModel,
          as: "category_author",
          attributes: ["id", "author_name"],
        },
      });
      return category;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async createCategory(categoryInfo: TypeCategoryInfo) {
    try {
      const newCategory = await this.categoryModel.create(categoryInfo);
      return newCategory;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async restoreCategory(categoryId: string) {
    try {
      let fadedCategory = await this.categoryModel.findOne({
        where: {
          id: categoryId,
        },
        attributes: ["deletedAt"],
        paranoid: false,
      });
      if (!fadedCategory?.deletedAt) {
        throw new ServerError(
          "Sequelize",
          "Cannot restore category. Maybe it is not deleted or existed."
        );
      }
      const result = await this.categoryModel.restore({
        where: {
          id: categoryId,
        },
      });
      return result;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      return await this.categoryModel.destroy({
        where: {
          id: categoryId,
        },
      });
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }
}

export default new CategoryRepository();
