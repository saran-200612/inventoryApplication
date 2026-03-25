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

          <Route path="/stock-edit/:pid/:no" element={<ProductStockEdit />} />

          <Route path="/sku-entry" element={<SKUEntry />} />
          <Route path="/sku-repo" element={<SKUReport />} />
          <Route path="/update-sku/:skuno" element={<SKUEdit />} />

          <Route path="/product-entry" element={<ProductEntry />} />
          <Route path="/product-repo" element={<ProductReport />} />
          <Route path="/edit-price/:pid" element={<ProductPriceEdit />} />

          {/* ✅ FIXED */}
          <Route path="/transaction-report/:pid" element={<TransactionReport />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;