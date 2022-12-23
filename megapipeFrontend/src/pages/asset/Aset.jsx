import "./asset.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import AssetDatatable from "../../components/datatable/AssetDatatable"

const Aset = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AssetDatatable/>
      </div>
    </div>
  )
}

export default Aset