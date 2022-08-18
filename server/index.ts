import app from "./src/app";
import sequelize from "./src/config/sequelize";

const APP_PORT = process.env.APP_PORT || 5000;

sequelize.sync().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://localhost:${APP_PORT}`);
  });
});
