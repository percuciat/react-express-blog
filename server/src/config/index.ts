import fs from "fs";
import path from "path";
import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const modelCollection: any = {};
const MODEL_PATH = path.join(process.cwd(), "src/models");

/* fs.readdirSync(MODEL_PATH)
  .forEach((file) => {
    const modelFile = require(path.join(MODEL_PATH, file));
    const modelInstance = modelFile.default
    console.log('modelFile--', modelInstance);
    
    modelCollection[modelFile.name] = modelFile
  });

Object.keys(modelCollection).forEach((modelName) => {
  if (modelCollection[modelName].associate) {
    modelCollection[modelName].associate(modelCollection);
  }
}); */

/* export default modelCollection; */
