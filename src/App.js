import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import VendorMenu from './Components/LoginComponent/VendorMenu';

import ProductStockEdit from './Components/ProductComponent/ProductStockEdit';

import SKUEntry from './Components/SKUComponent/SKUEntry';
import SKUReport from './Components/SKUComponent/SKUReport';
import SKUEdit from './Components/SKUComponent/SKUEdit';

import ProductEntry from './Components/ProductComponent/ProductEntry';
import ProductReport from './Components/ProductComponent/ProductReport';
import ProductPriceEdit from './Components/ProductComponent/ProductPriceEdit';
import ProductPieAnalysis from './Components/AnalysisComponent/ProductPieAnalysis';

import TransactionReport from './Components/ProductComponent/TransactionReport';

function App() {
  return (
    <BrowserRouter>
      <div className="app-background">
        <Routes>

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />

          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/manager-menu" element={<ManagerMenu />} />
          <Route path="/vendor-menu" element={<VendorMenu />} />

          {/* ✅ FIXED: was /stock-edit/:pid/:no — now matches ProductReport links */}
          <Route path="/edit-stock/:pid/:no" element={<ProductStockEdit />} />

          <Route path="/sku-entry" element={<SKUEntry />} />
          <Route path="/sku-repo" element={<SKUReport />} />
          <Route path="/update-sku/:skuno" element={<SKUEdit />} />

          <Route path="/product-entry" element={<ProductEntry />} />
          <Route path="/product-repo" element={<ProductReport />} />
          <Route path="/edit-price/:pid" element={<ProductPriceEdit />} />

          {/* ✅ FIXED: param name is :type to match param.pid usage in TransactionReport */}
          <Route path="/transaction-report/:pid" element={<TransactionReport />} />

          <Route path="/product-pie" element={<ProductPieAnalysis />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;