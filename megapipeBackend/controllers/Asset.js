import Asset from "../models/AssetModel.js";
import KategoriAsset from "../models/KategoriAssetModel.js";

// ASSET
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const getTotalAsset = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      attributes: ["amount_total"],
    });
    console.log(assets.length);
    console.log(assets[1].dataValues);
    let amount = 0;
    // assets.forEach(asset => {
    //   console.log(asset)
    // });
    
    for (let index = 0; index < assets.length; index++) {
      amount += assets[index].dataValues.amount_total;
    }
    res.status(200).json(amount);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const getAsset = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  try {
    const asset = await Asset.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json(asset);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const createAsset = async (req, res) => {
  const {
    name,
    code,
    dateBought,
    dateUsed,
    isIntagibleAsset,
    depreciationMethod,
    assetAccount,
    accumulatedDepreciationAccount,
    depreciationExpenseAccount,
    quantity,
    assetAgeYear,
    assetAgeMonth,
    ratio,
    assetCategory,
    assetLocation,
    assetRemaining,
    taxCategory,
    expenseAccount,
    expenseCoaDescription,
    expenseAmount,
    remarks,
    assetTotal,
  } = req.body;

  console.log(req.body);

  try {
    const asset = await Asset.create({
      name: name,
      number: code,
      date_acquired: dateBought,
      date_used: dateUsed,
      is_intangible: isIntagibleAsset,
      depreciationMethod: depreciationMethod,
      tax_category: taxCategory,
      amount_remaining: assetRemaining,
      quantity: quantity,
      amount_total: assetTotal,
      asset_remaining: assetRemaining,
      asset_location: assetLocation,
      asset_age_year: assetAgeYear,
      asset_age_month: assetAgeMonth,
      ratio: ratio,
      expense_coa_description: expenseCoaDescription,
      notes: remarks,
      kategoriAsetId: assetCategory,
      expenseAccountId: expenseAccount,
      accumulatedDepreciationAccount: accumulatedDepreciationAccount,
      akunPerkiraanId: assetAccount,
      depreciationExpenseAccountId: depreciationExpenseAccount,
    });
    res.status(200).json({
      message: "Your asset has been created",
      asset: asset,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const updateAsset = async (req, res) => {};

export const deleteAsset = async (req, res) => {};

// KATEGORI ASSET
export const getKategoriAssets = async (req, res) => {
  try {
    const kategoriAssets = await KategoriAsset.findAll();
    res.status(200).json(kategoriAssets);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const getKategoriAsset = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  try {
    const kategoriAsset = await KategoriAsset.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!kategoriAsset)
      return res.status(404).json({ message: "Kategori Asset not found" });

    res.status(200).json(kategoriAsset);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const createKategoriAsset = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.sendStatus(400);

  try {
    const kategoriAsset = await KategoriAsset.create({
      name: name,
    });
    res.status(200).json({
      message: "Your asset category has been created",
      kategoriAsset: kategoriAsset,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const updateKategoriAsset = async (req, res) => {
  const { name } = req.body;
  if (!name || !req.params.id) return res.sendStatus(400);

  try {
    await KategoriAsset.update(
      { name: name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Your asset category has been updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const deleteKategoriAsset = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  try {
    await KategoriAsset.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Your asset category has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};
