import "./chartOfAccount.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import ChartOfAccountDatatable from "../../components/datatable/ChartOfAccountDatatable"

const ChartOfAccount = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ChartOfAccountDatatable/>
      </div>
    </div>
  )
}

export default ChartOfAccount