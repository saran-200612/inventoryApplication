import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllSKUs, deleteSKUById } from "../../Services/SKUService";
import { getRole } from '../../Services/LoginService';
import '../../DisplayView.css';

const SKUReport = () => {

    let navigate = useNavigate();
    const [role, setRole] = useState("");
    const [skuList, setSkuList] = useState([]);

    const setRoleData = () => {
        getRole().then((response) => {
            setRole(response.data);
        });
    };

    const setSKURecords = () => {
        getAllSKUs().then((response) => {
            setSkuList(response.data);
        });
    };

    useEffect(() => {
        setRoleData();
        setSKURecords();
    }, []);

    const returnBack = () => {
        if (role === 'Admin')
            navigate('/admin-menu');
        else if (role === 'Manager')
            navigate('/manager-menu');
    };

    const deleteSKU = (id) => {
        deleteSKUById(id).then(() => {
            let remainSkus = skuList.filter((sku) => sku.skuId !== id);
            setSkuList(remainSkus);
            navigate('/sku-repo');
        });
    };

    return (
        <div className="text-center">
            <div>
                {role === 'Admin'
                    ? <h2>Admin SKU List</h2>
                    : <h2>Manager SKU List</h2>}

                <hr style={{ height: "3px", backgroundColor: "red" }} />

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>SKU Id</th>
                                <th>Description</th>
                                {role === 'Admin' && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {skuList.map((sku, index) => (
                                <tr key={sku.skuId}>
                                    <td>{index + 1}</td>
                                    <td>{sku.skuId}</td>
                                    <td>{sku.skuDescription}</td>

                                    {role === 'Admin' &&
                                        <td>
                                            <Link to={`/update-sku/${sku.skuId}`}>
                                                <button className="btn btn-info me-2">Update</button>
                                            </Link>
                                            <button
                                                onClick={() => deleteSKU(sku.skuId)}
                                                className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={returnBack}
                    className="btn btn-success">
                    Return
                </button>

            </div>
        </div>
    );
};

export default SKUReport;