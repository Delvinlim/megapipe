import "./formAsset.scss";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "../../../api/axios";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-data"
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `order-tab-${index}`,
    "aria-controls": `order-tabpanel-${index}`,
  };
}

const FormAset = ({ inputs, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    dateBought: new Date(),
    dateUsed: new Date(),
    isIntagibleAsset: false,
    depreciationMethod: "Tidak Terdepresiasi",
    assetAccount: null,
    accumulatedDepreciationAccount: null,
    depreciationExpenseAccount: null,
    quantity: 1,
    assetAgeYear: null,
    assetAgeMonth: null,
    ratio: null,
    assetCategory: null,
    assetLocation: null,
    assetRemaining: 0,
    taxCategory: "",
    expenseAccount: null,
    expenseCoaDescription: "",
    expenseAmount: 0,
    notes: "",
    assetTotal: 0,
  });
  const [value, setValue] = useState(0);
  const [assetCategory, setAssetCategory] = useState([]);
  const [account, setAccount] = useState([]);
  const [ratioValue, setRatioValue] = useState(null);
  const [showAssetAge, setShowAssetAge] = useState(true);
  const [showTaxCategory, setShowTaxCategory] = useState(false);
  const [assetTotal, setAssetTotal] = useState(0);

  useEffect(() => {
    const getKategoriAset = async () => {
      const res = await axios.get("/api/kategori");
      if (res) {
        setAssetCategory(res.data);
      }
    };
    getKategoriAset();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const res = await axios.get("/api/coa");

      if (res) {
        setAccount(res.data);
      }
    };
    getAccount();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [apiMsg, setApiMsg] = useState({
    msg: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/aset", formData);
      if (res) {
        setIsLoading(false);
        // setFormData({
        //   name: "",
        //   code: "",
        //   dateBought: new Date(),
        //   dateUsed: new Date(),
        //   isIntagibleAsset: false,
        //   depreciationMethod: "Tidak Terdepresiasi",
        //   assetAccount: "",
        //   accumulatedDepreciationAccount: "",
        //   depreciationExpenseAccount: "",
        //   quantity: 1,
        //   assetAgeYear: null,
        //   assetAgeMonth: null,
        //   ratio: null,
        //   assetCategory: null,
        //   assetLocation: null,
        //   assetRemaining: null,
        //   taxCategory: "",
        //   expenseAccount: "",
        //   expenseCoaDescription: "",
        //   expenseAmount: "",
        //   notes: "",
        // });
        setApiMsg({
          msg: res.data.message,
          type: "success",
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setApiMsg({
          msg: "Masukkan Nama Kategori",
          type: "error",
        });
      } else {
        setApiMsg({
          msg: err.response.data.message,
          type: "error",
        });
      }
      setIsLoading(false);
    }
  };

  const handleFormChange = (props) => (e) => {
    if (props === "isIntagibleAsset") {
      setFormData({ ...formData, [props]: e.target.checked });
    } else if (props === "depreciationMethod") {
      if (e.target.value === "Tidak Terdepresiasi") {
        setShowAssetAge(false);
      } else {
        setShowAssetAge(true);
      }
    } else if (props === "assetAgeYear") {
      let ratio = 1 / e.target.value;
      setRatioValue(ratio);
    } else if (props === "expenseAmount") {
      setFormData({ ...formData, "assetTotal": e.target.value });
      setAssetTotal(e.target.value);
    } else {
      setFormData({ ...formData, [props]: e.target.value });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="form-asset-new">
      <Sidebar />
      <div className="form-asset-newContainer">
        <Navbar />
        <div className="form-asset-top">
          <h1>{title}</h1>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="form-asset-bottom">
            <div className="form-asset-right">
              {apiMsg.msg && (
                <div className="api-message">
                  <Alert
                    onClose={() => setApiMsg({ msg: "", type: "" })}
                    severity={apiMsg.type}
                  >
                    {apiMsg.msg}
                  </Alert>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                  <div className="form-input-general">
                    {/* Name */}
                    <div className="form-input">
                      <label>Name</label>
                      <input
                        onChange={handleFormChange("name")}
                        type="text"
                        required
                      />
                    </div>

                    {/* Asset Code */}
                    <div className="form-input">
                      <label>Asset Code</label>
                      <input
                        onChange={handleFormChange("code")}
                        type="text"
                        required
                      />
                    </div>

                    {/* Date Bought */}
                    <div className="form-input">
                      <label>Date Bought</label>
                      <input
                        onChange={handleFormChange("dateBought")}
                        type="date"
                        placeholder="input asset bought date"
                        required
                      />
                    </div>

                    {/* Date Used */}
                    <div className="form-input">
                      <label>Date Used</label>
                      <input
                        onChange={handleFormChange("dateUsed")}
                        type="date"
                        placeholder="input asset usage date"
                        required
                      />
                    </div>

                    {/* Asset Total */}
                    <div className="form-input">
                      <label>Asset Total</label>
                      <input type="number" disabled value={assetTotal} />
                    </div>
                  </div>
                  <div className="form-input-advance">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="inherit"
                      aria-label="Tabs"
                      TabIndicatorProps={{ style: { background: "#7451f8" } }}
                      variant="fullWidth"
                    >
                      <Tab label="General Information" {...allyProps(value)} />
                      <Tab label="Others Information" {...allyProps(value)} />
                      <Tab label="Akun Pengeluaran" {...allyProps(value)} />
                    </Tabs>
                    <SwipeableViews
                      index={value}
                      onChangeIndex={(value) => setValue(value)}
                      enableMouseEvents
                      animateHeight
                    >
                      <TabPanel value={value} index={value}>
                        <div className="tab-panel">
                          <div className="tab-panel-left">
                            <div className="form-checkbox">
                              <label>Intangible Assets</label>
                              <input
                                onChange={handleFormChange("isIntagibleAsset")}
                                type="checkbox"
                              />
                            </div>
                            {/* Depreciation Method */}
                            <div className="form-input">
                              <label>Depreciation Method</label>
                              <select
                                name="depreciation_method"
                                id="depreciation_method"
                                onChange={handleFormChange(
                                  "depreciationMethod"
                                )}
                                required
                              >
                                <option value="Metode Garis Lurus">
                                  Metode Garis Lurus
                                </option>
                                <option value="Tidak Terdepresiasi">
                                  Tidak Terdepresiasi
                                </option>
                                <option value="Metode Saldo Menurun">
                                  Metode Saldo Menurun
                                </option>
                                <option value="Metode Angka Tahunan">
                                  Metode Angka Tahunan
                                </option>
                              </select>
                            </div>
                            {/* Asset Account */}
                            <div className="form-input">
                              <label>Asset Account</label>
                              <select
                                name="asset_account"
                                id="asset_account"
                                onChange={handleFormChange("assetAccount")}
                                required
                              >
                                {account &&
                                  account.map((acc) => {
                                    return (
                                      <option value={acc.id}>{acc.name}</option>
                                    );
                                  })}
                              </select>
                            </div>
                            {/* Accumulated Depreciation Account */}
                            <div className="form-input">
                              <label>Accumulated Depreciation Account</label>
                              <select
                                name="accumulated_depreciation_account"
                                id="accumulated_depreciation_account"
                                onChange={handleFormChange(
                                  "accumulatedDepreciationAccount"
                                )}
                                required
                                value={formData.accumulatedDepreciationAccount}
                              >
                                {account &&
                                  account.map((acc) => {
                                    return (
                                      <option value={acc.id}>{acc.name}</option>
                                    );
                                  })}
                              </select>
                            </div>
                            {/* Depreciation Expense Account */}
                            {showAssetAge && (
                              <div className="form-input">
                                <label>Depreciation Expense Account</label>
                                <select
                                  name="depreciation_expense_account"
                                  id="depreciation_expense_account"
                                  onChange={handleFormChange(
                                    "depreciationExpenseAccount"
                                  )}
                                  required
                                >
                                  {account &&
                                    account.map((acc) => {
                                      return (
                                        <option value={acc.id}>
                                          {acc.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            )}
                          </div>
                          <div className="tab-panel-right">
                            {/* Quantity */}
                            <div className="form-input">
                              <label>Quantity</label>
                              <input
                                onChange={handleFormChange("quantity")}
                                type="number"
                                required
                              />
                            </div>
                            {showAssetAge && (
                              <>
                                {/* Asset Age */}
                                <div className="form-input">
                                  <label>Asset Age</label>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <input
                                      style={{
                                        width: "100%",
                                        marginRight: "10px",
                                      }}
                                      onChange={handleFormChange(
                                        "assetAgeYear"
                                      )}
                                      type="number"
                                      required
                                    />
                                    Tahun
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <input
                                      style={{
                                        width: "100%",
                                        marginRight: "10px",
                                      }}
                                      onChange={handleFormChange(
                                        "assetAgeMonth"
                                      )}
                                      type="number"
                                      required
                                    />
                                    Bulan
                                  </div>
                                </div>
                                {/* Ratio */}
                                <div className="form-input">
                                  <label>Ratio</label>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <input
                                      style={{
                                        width: "100%",
                                        marginRight: "35px",
                                      }}
                                      type="number"
                                      value={ratioValue}
                                      disabled
                                    />
                                    %
                                  </div>
                                </div>
                              </>
                            )}
                            {!showAssetAge && (
                              <div className="form-input">
                                <label>Asset Price Remaining</label>
                                <input
                                  onChange={handleFormChange("assetRemaining")}
                                  type="number"
                                  required
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </TabPanel>

                      {/* Others Information */}
                      <TabPanel value={value} index={value}>
                        <div className="tab-panel">
                          <div className="tab-panel-left">
                            {/* Asset Kategori */}
                            <div className="form-input">
                              <label>Asset Category</label>
                              <select
                                name="asset_category"
                                id="asset_category"
                                onChange={handleFormChange("assetCategory")}
                                required
                              >
                                {assetCategory &&
                                  assetCategory.map((category) => {
                                    return (
                                      <option value={category.id}>
                                        {category.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            {/* Asset Location */}
                            <div className="form-input">
                              <label>Asset Location</label>
                              <select
                                name="asset_location"
                                id="asset_location"
                                onChange={handleFormChange("assetLocation")}
                                required
                              >
                                <option value="Rumah">Rumah</option>
                              </select>
                            </div>
                          </div>
                          <div className="tab-panel-right">
                            <div className="form-checkbox">
                              <label>Taxable</label>
                              <input
                                onChange={(e) =>
                                  setShowTaxCategory(!showTaxCategory)
                                }
                                type="checkbox"
                              />
                            </div>
                            {showTaxCategory && (
                              <div className="form-input">
                                <label>Tax Category</label>
                                <select
                                  name="tax_category"
                                  id="tax_category"
                                  onChange={handleFormChange("taxCategory")}
                                >
                                  <option value="Bangunan Permanen">
                                    Bangunan Permanen
                                  </option>
                                  <option value="Gol 1_Garis Lurus">
                                    Gol 1 [Garis Lurus]
                                  </option>
                                  <option value="Gol 1_Saldo Menurun">
                                    Gol 1 [Saldo Menurun]
                                  </option>
                                  <option value="Gol 2_Garis Lurus">
                                    Gol 2 [Garis Lurus]
                                  </option>
                                  <option value="Gol 2_Saldo Menurun">
                                    Gol 2 [Saldo Menurun]
                                  </option>
                                  <option value="Gol 3_Garis Lurus">
                                    Gol 3 [Garis Lurus]
                                  </option>
                                  <option value="Gol 3_Saldo Menurun">
                                    Gol 3 [Saldo Menurun]
                                  </option>
                                  <option value="Gol 4_Garis Lurus">
                                    Gol 4 [Garis Lurus]
                                  </option>
                                  <option value="Gol 4_Saldo Menurun">
                                    Gol 4 [Saldo Menurun]
                                  </option>
                                  <option value="Tidak Berwujud 1_Saldo Menurun">
                                    Tidak Berwujud 1 [Saldo Menurun]
                                  </option>
                                  <option value="Tidak Berwujud 2_Garis Lurus">
                                    Tidak Berwujud 2 [Garis Lurus]
                                  </option>
                                  <option value="Tidak Berwujud 2_Saldo Menurun">
                                    Tidak Berwujud 2 [Saldo Menurun]
                                  </option>
                                  <option value="Tidak Berwujud 3_Garis Lurus">
                                    Tidak Berwujud 3 [Garis Lurus]
                                  </option>
                                  <option value="Tidak Berwujud 3_Saldo Menurun">
                                    Tidak Berwujud 3 [Saldo Menurun]
                                  </option>
                                  <option value="Tidak Berwujud 4_Garis Lurus">
                                    Tidak Berwujud 4 [Garis Lurus]
                                  </option>
                                  <option value="Tidak Berwujud 4_Saldo Menurun">
                                    Tidak Berwujud 4 [Saldo Menurun]
                                  </option>
                                  <option value="Tidak Disusutkan">
                                    Tidak Disusutkan
                                  </option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </TabPanel>

                      <TabPanel value={value} index={value}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <div
                            className="form-input"
                            style={{
                              width: "100%",
                            }}
                          >
                            <label>Expense Account</label>
                            <select
                              name="expense_account"
                              id="expense_account"
                              onChange={handleFormChange("expenseAccount")}
                              required
                              style={
                                {
                                  // width: "100%",
                                }
                              }
                            >
                              {account &&
                                account.map((acc) => {
                                  return (
                                    <option value={acc.id}>{acc.name}</option>
                                  );
                                })}
                            </select>
                          </div>
                          <div
                            className="form-input"
                            style={{
                              width: "100%",
                            }}
                          >
                            <label>Description</label>
                            <input
                              onChange={handleFormChange(
                                "expenseCoaDescription"
                              )}
                              type="text"
                              required
                            />
                          </div>
                          <div
                            className="form-input"
                            style={{
                              width: "100%",
                            }}
                          >
                            <label>Amount</label>
                            <input
                              onChange={handleFormChange("expenseAmount")}
                              type="number"
                              required
                            />
                          </div>
                          <div
                            className="form-input"
                            style={{
                              width: "100%",
                            }}
                          >
                            <label>Notes</label>
                            <textarea
                              onChange={handleFormChange("notes")}
                              row="6"
                              col="50"
                            ></textarea>
                            {/* <input
                              onChange={handleFormChange("notes")}
                              type="textarea"
                            /> */}
                          </div>
                        </div>
                      </TabPanel>
                    </SwipeableViews>
                  </div>
                </div>
                <div className="form-footer">
                  <div className="form-button">
                    <Link className="outline-button" to="/assets/kategori">
                      Go Back
                    </Link>
                    <button type="submit">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAset;
