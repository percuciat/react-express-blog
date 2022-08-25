import { InstanceSequelize } from "./../config/sequelize";
import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
  Association,
  ModelCtor,
  BuildOptions,
} from "sequelize";

type DataTypes = typeof DataTypes;

interface AuthorModel
  extends Model<
    InferAttributes<AuthorModel>,
    InferCreationAttributes<AuthorModel>
  > {
  id: CreationOptional<string>;
  author_name: string;
  associate: (models: any) => void;
}

type Auth = ModelStatic<AuthorModel> & {
  associate: (models: any) => void;
};
/* type UserStatic = AuthorModel & { associate: (models: any) => void } & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserInstance;
}; */

const Author = (sequelize: InstanceSequelize, DataTypes: DataTypes) => {
  const authorModel = sequelize.define<AuthorModel>(
    "Author",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      author_name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      /* user_name: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "user_name",
        },
      }, */
    },
    {
      paranoid: true,
      tableName: "Authors",
      timestamps: false,
    }
  ) as any;

  authorModel.associate = (models) => {
    authorModel.hasMany(models.Category, {
      foreignKey: "authorId",
      as: "author_category",
    });
    authorModel.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "author",
    });
  };

  /* authorModel.hasMany(sequelize.Category, {
    foreignKey: "authorId",
    as: "author_category",
  });
  authorModel.hasMany(models.Post, {
    foreignKey: "authorId",
    as: "author",
  }); */

  return authorModel;
};

export default Author;
