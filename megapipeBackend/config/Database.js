import { Sequelize } from "sequelize";

const db = new Sequelize('megapipe', 'root', '', {
  host: "localhost",
  dialect: "mysql"
})

export default db;