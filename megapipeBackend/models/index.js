import Asset from "./AssetModel.js";
import ChartOfAccount from "./ChartOfAccountModel.js";
import KategoriAsset from "./KategoriAssetModel.js";
import Settings from "./SettingsModel.js";

const modelSync = async () => {
  try {
    // await KategoriAsset.sync();
    await Asset.sync({alter: true});
    // await Settings.sync();
    // await ChartOfAccount.sync();
  } catch (err) {
    console.error(err);
  }
};

export default modelSync;
