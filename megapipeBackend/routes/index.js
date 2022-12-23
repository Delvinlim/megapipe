import express from "express";
import {
  createAsset,
  createKategoriAsset,
  deleteAsset,
  deleteKategoriAsset,
  getAsset,
  getAssets,
  getKategoriAsset,
  getKategoriAssets,
  getTotalAsset,
  updateAsset,
  updateKategoriAsset,
} from "../controllers/Asset.js";
import {
  createChartOfAccount,
  deleteChartOfAccount,
  getChartOfAccount,
  getChartOfAccounts,
  updateChartOfAccount,
} from "../controllers/ChartOfAccount.js";

const router = express.Router();

router.get("/api/aset", getAssets);
router.get("/api/aset/:id", getAsset);
router.post("/api/aset", createAsset);
router.patch("/api/aset/:id", updateAsset);
router.delete("/api/aset/:id", deleteAsset);
router.get("/api/total/aset", getTotalAsset);

router.get("/api/kategori", getKategoriAssets);
router.get("/api/kategori/:id", getKategoriAsset);
router.post("/api/kategori", createKategoriAsset);
router.patch("/api/kategori/:id", updateKategoriAsset);
router.delete("/api/kategori/:id", deleteKategoriAsset);

router.get("/api/coa", getChartOfAccounts);
router.get("/api/coa/:id", getChartOfAccount);
router.post("/api/coa", createChartOfAccount);
router.patch("/api/coa/:id", updateChartOfAccount);
router.delete("/api/coa/:id", deleteChartOfAccount);

export default router;
