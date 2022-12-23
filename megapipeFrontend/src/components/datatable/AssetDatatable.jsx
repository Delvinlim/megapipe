import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  assetColumns,
  kategoriAssetColumns,
  userColumns,
  userRows,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AssetDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAsset = async () => {
      const res = await axios.get("/api/aset");
      console.log(res);
      if (res) {
        setData(res.data);
      }
    };
    getAsset();
  }, []);

  const handleDelete = (id) => {
    const deleteAsset = async () => {
      const res = await axios.delete(`/api/aset/${id}`);
      if (res) {
        setData(data.filter((item) => item.id !== id));
      }
    };
    deleteAsset();
  };

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 180,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <Link
  //             to={`/assets/${params.row.id}`}
  //             style={{ textDecoration: "none" }}
  //           >
  //             <div className="viewButton">View</div>
  //           </Link>
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row.id)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Assets
        <Link to="/assets/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={assetColumns}
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
        disableColumnSelector
        disableColumnFilter
        disableDensitySelector
      />
    </div>
  );
};

export default AssetDatatable;
