import "./asset.scss"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Sidebar from "../../components/sidebar/Sidebar"
import KategoriAssetDatatable from "../../components/datatable/KategoriAssetDatatable"

const KategoriAset = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <KategoriAssetDatatable/>
      </div>
    </div>
  )
}

export default KategoriAset