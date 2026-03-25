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

            <div className="bg-slate-800 shadow-lg">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
                    <h1 className="text-xl font-bold">
                        📦 Inventory Vendor Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 gap-6">

                <button className="bg-blue-500 hover:bg-blue-600 p-6 rounded-xl shadow-lg text-lg">
                    👤 Show User Details
                </button>

                <button
                    onClick={() => navigate("/product-repo")}
                    className="bg-indigo-500 hover:bg-indigo-600 p-6 rounded-xl shadow-lg text-lg"
                >
                    🔄 Stock Entry (IN / OUT)
                </button>

                <button
                    onClick={() => navigate("/transaction-report/IN")}
                    className="bg-teal-500 hover:bg-teal-600 p-6 rounded-xl shadow-lg text-lg"
                >
                    📊 View Purchase Transactions
                </button>

                <button
                    onClick={() => navigate("/transaction-report/OUT")}
                    className="bg-orange-500 hover:bg-orange-600 p-6 rounded-xl shadow-lg text-lg"
                >
                    📊 View Issue Transactions
                </button>

            </div>

        </div>
    );
};

export default VendorMenu;