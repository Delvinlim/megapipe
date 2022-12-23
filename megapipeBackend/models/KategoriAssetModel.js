import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Asset from "./AssetModel.js";

const { DataTypes } = Sequelize;

const KategoriAsset = db.define(
  "kategori_aset",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default KategoriAsset;