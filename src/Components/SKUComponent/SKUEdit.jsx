import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from '../../Services/SKUService';
import '../../DisplayView.css';

const SKUEdit = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [sku, setSku] = useState({});
    const [description, setDescription] = useState("");
    const param = useParams();

    const setSKUData = () => {
        getSKUById(param.skuno).then((response) => {
            setSku(response.data);
        });
    };

    useEffect(() => {
        setSKUData();
    }, []);

    const editSKU = (event) => {
        event.preventDefault();
        sku.skuDescription = description;
        updateSKU(sku).then(() => {
            alert("SKU Updated ");
            navigate("/sku-list");
        });
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!description || !description.trim()) {
            tempErrors.skuDescription = "SKU Description is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            editSKU(event);
        }
    };

    const returnBack = () => {
        navigate("/sku-list");
    };

    return (
        <div>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <div className="login-box">
                            <h2 className="text-center"><u>SKU Update</u></h2>
                            <br/>
                            <form>
                                <div className="form-group">
                                    <label>SKU ID:</label>
                                    <input className="form-control" value={sku.skuId}/>
                                </div>

                                <div className="form-group">
                                    <label>SKU Category:</label>
                                    <input className="form-control" value={sku.category}/>
                                </div>

                                <div className="form-group">
                                    <label>SKU Description:</label>
                                    <input
                                        className="form-control"
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                    {errors.skuDescription && <p style={{color:"red"}}>{errors.skuDescription}</p>}
                                </div>

                                <button className="btn btn-primary" onClick={handleValidation}>Submit</button>
                                <button className="btn btn-success" onClick={returnBack}>Return</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SKUEdit;