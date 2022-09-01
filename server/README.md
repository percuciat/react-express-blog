## [in progress] Full-Stack Blog app  

#
App has bootstrapped with CRA + NodeJS. MVP - CRUD operations.

Using packages:

### frontend

- React 17+,
- TypeScript
- RTK,
- AntD,
- Jest

### backend

- Express 4+
- PostgreSQL
- TypeScript
- SequelizeORM 6+

### launch preparations
 - npx sequelize-cli db:migrate - add migrations
 - npx sequelize-cli db:migrate:undo - revert all migrations 

 - npx sequelize-cli db:seed:all   - add seeders
 - npx sequelize-cli db:seed::undo:all - revert all seeds