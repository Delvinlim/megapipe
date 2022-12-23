import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ChartOfAccount from "./ChartOfAccountModel.js";
import KategoriAsset from "./KategoriAssetModel.js";

const { DataTypes } = Sequelize;

const Asset = db.define(
  "asets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sequence: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_acquired: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_used: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_intangible: {
      type: DataTypes.BOOLEAN,
    },
    deprecation_method: {
      type: DataTypes.STRING,
    },
    tax_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_remaining: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    asset_remaining: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    asset_location: {
      type: DataTypes.STRING,
    },
    asset_age_year: {
      type: DataTypes.INTEGER
    },
    asset_age_month: {
      type: DataTypes.INTEGER
    },
    ratio: {
      type: DataTypes.FLOAT
    },
    expense_coa_description: {
      type: DataTypes.STRING
    },
    remarks: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

KategoriAsset.hasOne(Asset);
Asset.belongsTo(KategoriAsset);

ChartOfAccount.hasOne(Asset, {
  foreignKey: {
    name: "expenseAccountId"
  }
});
Asset.belongsTo(ChartOfAccount);

ChartOfAccount.hasOne(Asset, {
  foreignKey: {
    name: "depreciationExpenseAccountId"
  }
});
Asset.belongsTo(ChartOfAccount);

ChartOfAccount.hasOne(Asset, {
  foreignKey: {
    name: "accumulatedDepreciationAccount"
  }
});
Asset.belongsTo(ChartOfAccount);

export default Asset;
