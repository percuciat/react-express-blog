import { connect } from "../config";

import { BadRequestError, DataBaseError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";

class CategoryRepository {
  repo: any;

  constructor() {
    this.repo = {};
    connect()
      .then((res) => {
        console.log("--connection Category repo--");
        this.repo = res.Category;
        return res;
      })
      .catch((error) => {
        console.log("error CATCH Category connects:", error);
        let errorDB = error as Error;
        throw new DataBaseError(`bad connection - ${errorDB.name}`);
      });
  }

  async getCategories() {
    try {
      const categories = await this.repo.findAll({
        attributes: ["id", "category_name"],
        include: ["author_category"],
      });
      return categories;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await this.repo.findByPk(categoryId, {
        attributes: ["id", "category_name"],
        include: ["author_category"],
      });
      return category;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async createCategory(categoryInfo) {
    try {
      const newCategory = await this.repo.create(categoryInfo);
      return newCategory;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }

  async deleteCategory(categoryId) {
    try {
      return await this.repo.destroy({
        where: {
          id: categoryId,
        },
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.name}`);
    }
  }
}

export default new CategoryRepository();
