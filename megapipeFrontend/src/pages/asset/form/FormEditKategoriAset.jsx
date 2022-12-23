import "./formAsset.scss";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import axios from "../../../api/axios";
import Alert from "@mui/material/Alert";
import { Link, useLocation } from "react-router-dom";

const FormEditKategoriAset = ({ inputs, title }) => {
  const [name, setName] = useState("");
  const [apiMsg, setApiMsg] = useState({
    msg: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  useEffect(() => {
    const getKategoriAsset = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/kategori/${id}`);
        if (res) {
          setIsLoading(false);
          setName(res.data.name);
        }
      } catch (err) {
        setIsLoading(false);
        setApiMsg({
          msg: err.response.data.message,
          type: "error",
        });
      }
    };
    getKategoriAsset();

    return () => {
      getKategoriAsset();
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/kategori/${id}`, { name: name });
      if (res) {
        setIsLoading(false);
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

  return (
    <div className="form-kategori-asset-new">
      <Sidebar />
      <div className="form-kategori-asset-newContainer">
        <Navbar />
        <div className="form-kategori-asset-top">
          <h1>{title}</h1>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="form-kategori-asset-bottom">
            <div className="form-kategori-asset-right">
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
                {inputs.map((input) => (
                  <div className="form-input" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={name}
                    />
                  </div>
                ))}
                <div className="form-kategori-asset-button">
                  <Link className="outline-button" to="/assets/kategori">
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

export default FormEditKategoriAset;
