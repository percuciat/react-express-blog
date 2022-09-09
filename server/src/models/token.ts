import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize";

interface TokenModel
  extends Model<
    InferAttributes<TokenModel>,
    InferCreationAttributes<TokenModel>
  > {
  refresh_token: string;
  user_id: string;
}

export type TokenType = ModelStatic<TokenModel>;

export const Token = sequelize.define<TokenModel>(
  "Token",
  {
    refresh_token: {
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.UUID,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: false,
  }
) as ModelStatic<TokenModel>;
