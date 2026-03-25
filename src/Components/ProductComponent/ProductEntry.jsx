import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveNewProduct, productIdGenerator } from "../../Services/ProductService";
import { getUsersByRole } from "../../Services/LoginService";
import { getAllCategories, getSkuIdByCategory } from "../../Services/SKUService";
import "../../DisplayView.css";

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
  const [skuCategory, setSkuCategory] = useState("");
  const [skuIdList, setSkuIdList] = useState([]);
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    productIdGenerator().then((res) => {
      setNewId(res.data);
    });

    getUsersByRole("Vendor").then((res) => {
      setVendorList(res.data);
    });

    getAllCategories().then((res) => {
      setSkuCategoryList(res.data);
    });

  }, []);

  const onChangeHandler = (event) => {

    const { name, value } = event.target;

    setProduct((values) => ({
      ...values,
      [name]: value
    }));

  };

  const handleCategoryChange = (event) => {

    const value = event.target.value;
    setSkuCategory(value);

    getSkuIdByCategory(value).then((res) => {
      setSkuIdList(res.data);
    });

  };

  const saveProduct = () => {

    let newProduct = { ...product };

    newProduct.productId = newId;
    newProduct.productName = skuCategory;

    if (parseFloat(newProduct.stock) <= parseFloat(newProduct.reorderLevel)) {
      newProduct.status = false;
    }

    saveNewProduct(newProduct).then(() => {
      setFlag(true);
    });

  };

  const handleValidation = (event) => {

    event.preventDefault();

    saveProduct();

  };

  return (

    <div className="container">

      <div className="login-box">

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          New Product Entry
        </h2>

        <form onSubmit={handleValidation}>

          <div className="form-group">
            <label>Product ID</label>
            <input
              className="form-control"
              value={newId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>SKU Category</label>
            <select
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option>---</option>

              {skuCategoryList.map((cat, index) => (
                <option key={index}>{cat}</option>
              ))}

            </select>
          </div>

          <div className="form-group">
            <label>SKU ID</label>
            <select
              name="skuId"
              className="form-control"
              onChange={onChangeHandler}
            >
              <option>---</option>

              {skuIdList.map((sku, index) => (
                <option key={index}>{sku}</option>
              ))}

            </select>
          </div>

          <div className="form-group">
            <label>Purchase Price</label>
            <input
              name="purchasePrice"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              name="stock"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Reorder Level</label>
            <input
              name="reorderLevel"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Vendor</label>
            <select
              name="vendorId"
              className="form-control"
              onChange={onChangeHandler}
            >
              <option>---</option>

              {vendorList.map((vendor, index) => (
                <option key={index}>{vendor}</option>
              ))}

            </select>
          </div>

          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <button
              type="submit"
              className="btn btn-success"
            >
              Save
            </button>

            <Link to="/admin-menu">
              <button
                type="button"
                className="btn btn-warning"
              >
                Return
              </button>
            </Link>

          </div>

        </form>

        {flag && (
          <p style={{ color: "green", marginTop: "15px", textAlign: "center" }}>
            Product Saved Successfully
          </p>
        )}

      </div>

    </div>

  );

};

export default ProductEntry;