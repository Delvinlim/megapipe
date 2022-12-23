import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import KategoriAsset from "./KategoriAssetModel.js";

const { DataTypes } = Sequelize;

const ChartOfAccount = db.define(
  "akun_perkiraan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

ChartOfAccount.hasOne(ChartOfAccount);
ChartOfAccount.belongsTo(ChartOfAccount);

export default ChartOfAccount;
