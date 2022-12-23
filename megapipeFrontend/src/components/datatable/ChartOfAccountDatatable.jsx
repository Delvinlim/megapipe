import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ChartOfAccountColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
// {formatter.format(PRICE)}

const ChartOfAccountDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getChartOfAccount = async () => {
      const res = await axios.get("/api/coa");
      if (res) {
        console.log(res.data)
        setData(res.data);
      }
    };
    getChartOfAccount();
  }, []);

  const handleDelete = (id) => {
    const deleteChartOfAccount = async () => {
      const res = await axios.delete(`/api/coa/${id}`);
      if (res) {
        setData(data.filter((item) => item.id !== id));
      }
    };
    deleteChartOfAccount();
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
              to={`/account/${params.row.id}`}
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
        Chart Of Account
        <Link to="/account/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={ChartOfAccountColumns.concat(actionColumn)}
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

export default ChartOfAccountDatatable;
