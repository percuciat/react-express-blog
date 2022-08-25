import db from "../config";

import { DataBaseError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";

class CategoryRepository {
  categoryModel: any;

  constructor() {
    this.categoryModel = db.Category;
  }

  async getCategories() {
    try {
      const categories = await this.categoryModel.findAll({
        attributes: ["id", "category_name"],
        include: ["author_category"],
      });
      return categories;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await this.categoryModel.findByPk(categoryId, {
        attributes: ["id", "category_name"],
        include: ["author_category"],
      });
      return category;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async createCategory(categoryInfo) {
    try {
      const newCategory = await this.categoryModel.create(categoryInfo);
      return newCategory;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async deleteCategory(categoryId) {
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
