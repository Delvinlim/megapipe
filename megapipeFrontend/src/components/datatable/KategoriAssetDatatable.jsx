import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  kategoriAssetColumns,
  userColumns,
  userRows,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const KategoriAssetDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getKategoriAsset = async () => {
      const res = await axios.get("/api/kategori");
      console.log(res);
      if (res) {
        setData(res.data);
      }
    };
    getKategoriAsset();
  }, []);

  const handleDelete = (id) => {
    const deleteKategoriAsset = async () => {
      const res = await axios.delete(`/api/kategori/${id}`);
      if (res) {
        setData(data.filter((item) => item.id !== id));
      }
    };
    deleteKategoriAsset();
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/assets/kategori/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Category Assets
        <Link to="/assets/kategori/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={kategoriAssetColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default KategoriAssetDatatable;
