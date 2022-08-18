import { Request, Response } from "express";
import categoryService from "../services/categoryService";

const category = {
  async create(req: Request, res: Response) {
    return res.status(200).json({
      data: "create category",
    });
    /* try {
      const { category: name } = req.body;
      const { status, message, payload } = await categoryService.create(name);
      if (status === "Error") {
        return res.status(400).json({
          status: status,
          errorData: [
            {
              message: message,
            },
          ],
        });
      } else {
        res.status(200).json({
          status: status,
          message: message,
          data: payload,
        });
      }
    } catch (error: any) {
      return res.status(400).json({
        status: "Error",
        errorData: [
          {
            message: error.message,
          },
        ],
      }); */
  },

  async getCategory(req: Request, res: Response) {
    return res.status(200).json({
      data: "get category",
    });
    /* try {
      const { status, message, payload } = await categoryService.categories();
      return res.status(200).json({
        status,
        message,
        data: payload,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Error",
        errorData: [
          {
            message: error.message,
          },
        ],
      });
    } */
  },

  async delete(req: Request, res: Response) {
    return res.status(200).json({
      data: "delete category",
    });
    /* try {
      const { _id } = req.body;
      const { status, message, payload } = await categoryService.delete(_id);
      if (status === "Error") {
        return res.status(400).json({
          status: status,
          errorData: [
            {
              message: message,
            },
          ],
        });
      }
      return res.status(200).json({
        status,
        message,
        data: payload,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Error",
        errorData: [
          {
            message: error.message,
          },
        ],
      });
    } */
  },
};

export default category;
