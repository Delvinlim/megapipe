import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  assetInputs,
  coaInputs,
  kategoriAssetInputs,
  productInputs,
  userInputs,
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import FormKategoriAset from "./pages/asset/form/FormKategoriAset";
import KategoriAset from "./pages/asset/KategoriAset";
import FormEditKategoriAset from "./pages/asset/form/FormEditKategoriAset";
import Aset from "./pages/asset/Aset";
import FormAset from "./pages/asset/form/FormAset";
import ChartOfAccount from "./pages/chartofaccount/ChartOfAccount";
import FormChartOfAccount from "./pages/chartofaccount/form/FormChartOfAccount";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="assets">
              <Route index element={<Aset />} />
              <Route path=":assetId" element={<Single />} />
              <Route
                path="new"
                element={
                  <FormAset inputs={assetInputs} title="Add New Asset" />
                }
              />
              <Route path="kategori">
                <Route index element={<KategoriAset />} />
                <Route
                  path=":kategoryAssetId"
                  element={
                    <FormEditKategoriAset
                      inputs={kategoriAssetInputs}
                      title="Edit Category"
                    />
                  }
                />
                <Route
                  path="new"
                  element={
                    <FormKategoriAset
                      inputs={kategoriAssetInputs}
                      title="Add New Asset Category"
                    />
                  }
                />
              </Route>
            </Route>
            <Route path="account">
              <Route index element={<ChartOfAccount />} />
              <Route
                  path=":accountId"
                  element={
                    <FormEditKategoriAset
                      inputs={coaInputs}
                      title="Edit Chart Of Account"
                    />
                  }
                />
                <Route
                  path="new"
                  element={
                    <FormChartOfAccount
                      inputs={coaInputs}
                      title="Add New Chart Of Account"
                    />
                  }
                />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
