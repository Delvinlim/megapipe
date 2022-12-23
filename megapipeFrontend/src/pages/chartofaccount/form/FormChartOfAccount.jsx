import "./formChartOfAccount.scss";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "../../../api/axios";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const FormChartOfAccount = ({ inputs, title }) => {
  const [formData, setFormData] = useState({
    type: "Kas Bank",
    code: "",
    name: "",
    amount: 0,
    coaId: "",
  });
  const [isSubAccount, setIsSubAccount] = useState(false);
  const [apiMsg, setApiMsg] = useState({
    msg: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const getCOA = async () => {
      const res = await axios.get("/api/coa");
      if (res) {
        console.log(res);
        setAccount(res.data);
      }
    };
    getCOA();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/coa", formData);
      if (res) {
        setIsLoading(false);
        setFormData({
          type: "",
          code: "",
          name: "",
          amount: "",
          coaId: "",
        });
        setApiMsg({
          msg: res.data.message,
          type: "success",
        });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setApiMsg({
          msg: "Masukkan Data Yang Diperlukan",
          type: "error",
        });
      } else {
        setApiMsg({
          msg: err.response.data.message,
          type: "error",
        });
      }
      setIsLoading(false);
      // setError(err.data)
    }
  };

  const handleChange = (props) => (e) => {
    setFormData({ ...formData, [props]: e.target.value });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  // useEffect(() => {
  //   const defaultCode = () => {
  //     if (isSubAccount) {
  //       console.log(account.name)
  //       setFormData({ ...formData, code: account.name });
  //     }
  //   }
  //   defaultCode()
  //   return () => {
  //     defaultCode()
  //   }
  // }, [isSubAccount, account, formData]);

  return (
    <div className="form-coa-new">
      <Sidebar />
      <div className="form-coa-newContainer">
        <Navbar />
        <div className="form-coa-top">
          <h1>{title}</h1>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="form-coa-bottom">
            <div className="form-coa-right">
              {apiMsg.msg && (
                <div className="api-message-kategori-asset">
                  <Alert
                    onClose={() => setApiMsg({ msg: "", type: "" })}
                    severity={apiMsg.type}
                  >
                    {apiMsg.msg}
                  </Alert>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-coa-input">
                  <label>Account Type</label>
                  <select
                    name="account_type"
                    id="account_type"
                    type="text"
                    onChange={handleChange("type")}
                    required
                    value={formData.type}
                  >
                    <option value="Kas Bank">Kas Bank</option>
                    <option value="Piutang Usaha">Piutang Usaha</option>
                  </select>
                </div>
                <div className="form-coa-checkbox">
                  <label>Sub Account</label>
                  <input
                    onChange={(e) => setIsSubAccount(!isSubAccount)}
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {isSubAccount && (
                    <select
                      name="account"
                      id="account"
                      onChange={handleChange("coaId")}
                      required
                      value={formData.coaId}
                    >
                      {account.map((acc) => {
                        return <option value={acc.id}>{acc.name}</option>;
                      })}
                    </select>
                  )}
                </div>

                <div className="form-coa-input">
                  <label>Name</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    onChange={handleChange("name")}
                    required
                  />
                </div>
                <div className="form-coa-input">
                  <label>Code</label>
                  <input
                    name="code"
                    id="code"
                    type="text"
                    onChange={handleChange("code")}
                    required
                    value={formData.code}
                  />
                </div>
                <div className="form-coa-input">
                  <label>Balance</label>
                  <input
                    name="amount"
                    id="amount"
                    onChange={handleChange("amount")}
                    required
                    type="number"
                    value={formData.amount}
                  />
                </div>
                <div className="form-coa-button">
                  <Link className="outline-button" to="/account">
                    Go Back
                  </Link>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormChartOfAccount;
