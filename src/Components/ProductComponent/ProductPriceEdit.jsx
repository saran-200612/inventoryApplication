import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, editProductPrice } from '../../Services/ProductService';
import "../../DisplayView.css";

const ProductPriceEdit = () => {
    const param = useParams();
    let navigate = useNavigate();

    const [newPrice, setNewPrice] = useState("");
    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        skuId: "",
        purchasePrice: 0.0,
        salesPrice: 0.0,
        reorderLevel: 0.0,
        stock: 0.0,
        vendorId: "",
        status: true
    });

    const [flag, setFlag] = useState(false);

    const setProductData = () => {
        getProductById(param.pid)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        setFlag(false);
        setProductData();
    }, []);

    const returnBack = () => {
        navigate('/product-repo');
    };

    const onChangeHandler = (event) => {
        setNewPrice(event.target.value);
    };

    const updatePrice = (event) => {
        event.preventDefault();

        const updatedProduct = {
            ...product,
            purchasePrice: newPrice
        };

        editProductPrice(updatedProduct)
            .then(() => {
                setFlag(true);
            })
            .catch(error => {
                console.error(error);
                alert("Error updating price");
            });
    };

    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Edit Product Price </h3>

                <div className="card-body">

                    <div>Product ID: {product.productId}</div>
                    <div>SKU Id: {product.skuId}</div>
                    <div>Product Name: {product.productName}</div>
                    <div>Purchase Price: {product.purchasePrice}</div>
                    <div>Sales Price: {product.salesPrice}</div>
                    <div>Reorder Level: {product.reorderLevel}</div>
                    <div>Stock: {product.stock}</div>
                    <div>Vendor ID: {product.vendorId}</div>

                    <div className="form-group">
                        <label>Enter new Purchase Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={newPrice}
                            onChange={onChangeHandler}
                            placeholder="Enter new price"
                        />
                    </div>

                    {flag && <p style={{ color: "green" }}>Product Price Updated...</p>}

                    <button className="btn btn-success" onClick={updatePrice}>
                        Save
                    </button>

                    &nbsp;&nbsp;

                    <button className="btn btn-warning" onClick={returnBack}>
                        Return
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductPriceEdit;