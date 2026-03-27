import React from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/LoginService';

const VendorMenu = () => {

    let navigate = useNavigate();

    const handleLogout = () => {
        logoutUser().then(() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            <div className="bg-slate-800 p-4 flex justify-between">
                <h2>Vendor Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6">

                <button onClick={() => navigate("/product-repo")}>
                    View Products
                </button>

                <button onClick={() => navigate("/transaction-report/IN")}>
                    Purchase Transactions
                </button>

                <button onClick={() => navigate("/transaction-report/OUT")}>
                    Issue Transactions
                </button>

            </div>
        </div>
    );
};

export default VendorMenu;