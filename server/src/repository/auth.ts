import { connect } from "../config";
/* import { v4 } from "uuid"; */
import { BadRequestError, ServerError, NotFoundError } from "../helpers/errors";
import type { Error } from "sequelize";

class AuthRepository {
  repo: any;

  constructor() {
    this.repo = {};
    connect()
      .then((res) => {
        console.log("--connection repo--");
        this.repo = res.User;
        return res;
      })
      .catch((e) => console.log("error CATCH USER connects:", e));

    // this.redisDB = connectRedis();
    // For Development
  }

  
  async register(userInfo) {
    try {
      const user = await this.repo.findOne({
        where: {
          user_name: userInfo.user_name,
          user_email: userInfo.user_email,
        },
      });
      if(user){
        throw new ServerError(`${'User already registred'}`);
      }
      const userNew = await this.repo.create(userInfo);
      return userNew;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }

  async login(userInfo) {
    try {
      const user = await this.repo.findOne({
        where: {
          user_name: userInfo.user_name,
        },
      });
      if(!user){
        throw new ServerError(`${'User not found'}`);
      }
      return user;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new ServerError(`${errorDB.name}`);
    }
  }
}

export default new AuthRepository();
