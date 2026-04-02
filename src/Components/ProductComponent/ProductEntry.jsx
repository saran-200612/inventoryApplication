import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveNewProduct, productIdGenerator } from "../../Services/ProductService";
import { getUsersByRole } from "../../Services/LoginService";
import { getAllCategories, getSkuIdByCategory } from "../../Services/SKUService";

const ProductEntry = () => {

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    skuId: "",
    purchasePrice: "",
    salesPrice: "",
    reorderLevel: "",
    stock: "",
    vendorId: "",
    status: true
  });

  const [newId, setNewId] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [skuCategoryList, setSkuCategoryList] = useState([]);
  const [skuIdList, setSkuIdList] = useState([]);
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    productIdGenerator().then((res) => { setNewId(res.data); });
    getUsersByRole("Vendor").then((res) => { setVendorList(res.data); });
    getAllCategories().then((res) => { setSkuCategoryList(res.data); });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    getSkuIdByCategory(value).then((res) => { setSkuIdList(res.data); });
  };

  const saveProduct = () => {
    let newProduct = { ...product };
    newProduct.productId = newId;
    // productName is now taken directly from state (typed by user)
    if (parseFloat(newProduct.stock) <= parseFloat(newProduct.reorderLevel)) {
      newProduct.status = false;
    }
    saveNewProduct(newProduct).then(() => {
      setFlag(true);
      setTimeout(() => navigate('/product-repo'), 1500);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    saveProduct();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        .pe-root { min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif; background-color:#0a0e1a;
          background-image:radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
          url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
          background-size:cover; background-position:center; background-attachment:fixed; position:relative; }
        .pe-root::before { content:''; position:fixed; inset:0;
          background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%); z-index:0; }
        .pe-content { position:relative; z-index:1; }
        .pe-header { background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(14,165,233,0.2); padding:16px 32px;
          display:flex; align-items:center; justify-content:space-between; }
        .pe-title { font-size:22px; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; text-transform:uppercase; }
        .pe-subtitle { font-size:11px; color:rgba(14,165,233,0.7); letter-spacing:2px; text-transform:uppercase; }
        .pe-btn { background:rgba(14,165,233,0.15); border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
          padding:9px 20px; border-radius:8px; font-family:'Rajdhani',sans-serif;
          font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; text-decoration:none; display:inline-block; }
        .pe-btn:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
        .pe-form-wrap { max-width:560px; margin:40px auto; padding:0 20px; }
        .pe-card { background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
          border:1px solid rgba(14,165,233,0.15); border-radius:16px; padding:32px;
          box-shadow:0 24px 48px rgba(0,0,0,0.4); }
        .pe-label { display:block; font-size:12px; font-weight:600; letter-spacing:1.5px;
          text-transform:uppercase; color:rgba(14,165,233,0.7); margin-bottom:6px; }
        .pe-input { width:100%; padding:10px 14px; background:rgba(255,255,255,0.05);
          border:1px solid rgba(14,165,233,0.2); border-radius:8px; color:#e2e8f0;
          font-family:'Rajdhani',sans-serif; font-size:14px; outline:none;
          transition:border-color 0.2s; box-sizing:border-box; }
        .pe-input:focus { border-color:rgba(14,165,233,0.5); background:rgba(255,255,255,0.08); }
        .pe-input option { background:#0a0e1a; color:#e2e8f0; }
        .pe-field { margin-bottom:18px; }
        .pe-save-btn { width:100%; padding:12px; background:linear-gradient(135deg,#0ea5e9,#0284c7);
          border:none; border-radius:8px; color:#fff; font-family:'Rajdhani',sans-serif;
          font-size:15px; font-weight:700; letter-spacing:1px; cursor:pointer; transition:all 0.2s; margin-top:8px; }
        .pe-save-btn:hover { background:linear-gradient(135deg,#38bdf8,#0ea5e9); }
        .pe-success { margin-top:16px; background:rgba(52,211,153,0.12); border:1px solid rgba(52,211,153,0.3);
          border-radius:8px; padding:12px; text-align:center; color:#34d399; font-weight:600; }
      `}</style>

      <div className="pe-root">
        <div className="pe-content">

          <div className="pe-header">
            <div>
              <div className="pe-title">📦 New Product Entry</div>
              <div className="pe-subtitle">Add product to inventory</div>
            </div>
            <Link to="/admin-menu" className="pe-btn">← Dashboard</Link>
          </div>

          <div className="pe-form-wrap">
            <div className="pe-card">
              <form onSubmit={handleValidation}>

                <div className="pe-field">
                  <label className="pe-label">Product ID</label>
                  <input className="pe-input" value={newId} readOnly />
                </div>

                <div className="pe-field">
                  <label className="pe-label">Product Name</label>
                  <input
                    name="productName"
                    className="pe-input"
                    value={product.productName}
                    onChange={onChangeHandler}
                    placeholder="e.g. Milk 1L, Basmati Rice 5kg"
                    required
                  />
                </div>

                <div className="pe-field">
                  <label className="pe-label">SKU Category</label>
                  <select className="pe-input" onChange={handleCategoryChange}>
                    <option>---</option>
                    {skuCategoryList.map((cat, index) => (
                      <option key={index}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="pe-field">
                  <label className="pe-label">SKU ID</label>
                  <select name="skuId" className="pe-input" onChange={onChangeHandler}>
                    <option>---</option>
                    {skuIdList.map((sku, index) => (
                      <option key={index}>{sku}</option>
                    ))}
                  </select>
                </div>

                <div className="pe-field">
                  <label className="pe-label">Purchase Price</label>
                  <input name="purchasePrice" className="pe-input" onChange={onChangeHandler} placeholder="e.g. 500" />
                </div>

                <div className="pe-field">
                  <label className="pe-label">Stock</label>
                  <input name="stock" className="pe-input" onChange={onChangeHandler} placeholder="e.g. 200" />
                </div>

                <div className="pe-field">
                  <label className="pe-label">Reorder Level</label>
                  <input name="reorderLevel" className="pe-input" onChange={onChangeHandler} placeholder="e.g. 50" />
                </div>

                <div className="pe-field">
                  <label className="pe-label">Vendor</label>
                  <select name="vendorId" className="pe-input" onChange={onChangeHandler}>
                    <option>---</option>
                    {vendorList.map((vendor, index) => (
                      <option key={index}>{vendor}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="pe-save-btn">💾 Save Product</button>

              </form>

              {flag && (
                <div className="pe-success">✅ Product Saved Successfully!</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductEntry;