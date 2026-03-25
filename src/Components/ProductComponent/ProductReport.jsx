import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { displayAllProducts, deleteAProduct } from "../../Services/ProductService";
import { getRole } from "../../Services/LoginService";

const ProductReport = () => {

  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const setProductData = () => {

    displayAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        alert("Error occurred while loading data");
      });

  };

  const setRoleData = () => {

    getRole().then((response) => {
      setRole(response.data);
    });

  };

  useEffect(() => {

    setRoleData();
    setProductData();

  }, []);

  const removeProduct = (id) => {

    deleteAProduct(id).then(() => {

      const remainProducts = products.filter(
        (product) => product.productId !== id
      );

      setProducts(remainProducts);

    });

  };

  const returnBack = () => {

    if (role === "Admin")
      navigate("/admin-menu");

    else if (role === "Manager")
      navigate("/manager-menu");

  };

  return (

    <div className="container text-center">

      {role === "Admin"
        ? <h2>Admin Product List</h2>
        : <h2>Manager Product List</h2>
      }

      <div className="row">

        <table className="table table-striped table-bordered">

          <thead>

            <tr>
              <th>Product Id</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Vendor Id</th>
              <th>Purchase Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.productId}>

                <td>{product.productId}</td>
                <td>{product.skuId}</td>
                <td>{product.productName}</td>
                <td>{product.vendorId}</td>
                <td>{product.purchasePrice}</td>
                <td>{product.salesPrice}</td>
                <td>{product.stock}</td>
                <td>{product.reorderLevel}</td>

                <td>

                  {product.status
                    ? <span style={{ color: "blue" }}>Permitted to Issue</span>
                    : <span style={{ color: "red" }}>Reorder Level Reached</span>
                  }

                </td>

                <td>

                  <Link to={`/edit-stock/${product.productId}/2`}>
                    <button
                      className="btn btn-warning"
                      disabled={!product.status}
                      style={{ marginRight: "5px" }}
                    >
                      Issue
                    </button>
                  </Link>

                  <Link to={`/edit-stock/${product.productId}/1`}>
                    <button
                      className="btn btn-success"
                      style={{ marginRight: "5px" }}
                    >
                      Purchase
                    </button>
                  </Link>

                  {role === "Admin" && (

                    <>
                      <Link to={`/edit-price/${product.productId}`}>
                        <button
                          className="btn btn-secondary"
                          style={{ marginRight: "5px" }}
                        >
                          Price Update
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => removeProduct(product.productId)}
                      >
                        Delete
                      </button>
                    </>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <button
        className="btn btn-danger"
        onClick={returnBack}
      >
        Return
      </button>

    </div>

  );

};

export default ProductReport;