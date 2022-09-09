import { DataBaseError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";
import { Category, CategoryType, CategoryModel } from "../models/category";
import { Author, AuthorType } from "../models/author";

export interface InterfaceCategoryRepository {
  getCategories(): Promise<CategoryModel[]>;
  getCategoryById(categoryName: string): Promise<CategoryModel | null>;
  createCategory(categoryInfo: TypeCategoryInfo): Promise<CategoryModel>;
  deleteCategory(categoryId: string): Promise<number>;
}

type TypeCategoryInfo = {
  category_name: string;
  category_author: string;
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
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async getCategoryById(categoryName) {
    try {
      const category = await this.categoryModel.findByPk(categoryName, {
        attributes: ["id", "category_name"],
        include: {
          model: this.authorModel,
          as: "category_author",
          attributes: ["id", "author_name"],
        },
      });
      return category;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async createCategory(categoryInfo: TypeCategoryInfo) {
    try {
      const newCategory = await this.categoryModel.create(categoryInfo);
      return newCategory;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
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
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }
}

export default new CategoryRepository();
