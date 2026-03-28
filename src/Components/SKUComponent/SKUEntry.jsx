import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSKU } from "../../Services/SKUService";

const SKUEntry = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState(false);

    // ✅ FIXED: Added category to state
    const [skuData, setSkuData] = useState({
        skuId: "",
        category: "",
        skuDescription: "",
    });

    useEffect(() => {
        setFlag(false);
    }, []);

    const createNewSKU = (event) => {
        event.preventDefault();
        saveSKU(skuData).then(() => {
            setFlag(true);
        }).catch(() => {
            alert("Failed to save SKU. Please try again.");
        });
    };

    const onChangeHandler = (event) => {
        setFlag(false);
        const { name, value } = event.target;
        setSkuData(values => ({ ...values, [name]: value }));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!skuData.skuId.trim()) {
            tempErrors.skuId = "SKU Id is required";
            isValid = false;
        }

        // ✅ FIXED: Validate category
        if (!skuData.category.trim()) {
            tempErrors.category = "Category is required";
            isValid = false;
        }

        if (!skuData.skuDescription.trim()) {
            tempErrors.skuDescription = "SKU Description is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewSKU(event);
        }
    };

    const returnBack = () => {
        navigate('/admin-menu');
    };

    // ✅ FIXED: Reset state properly using setState, not direct mutation
    const nextEntry = () => {
        setSkuData({
            skuId: "",
            category: "",
            skuDescription: "",
        });
        setFlag(false);
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            {/* Header */}
            <div className="bg-slate-800 shadow-lg px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">➕ New SKU Entry</h2>
                <button
                    onClick={returnBack}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                    ← Return
                </button>
            </div>

            {/* Form */}
            <div className="max-w-lg mx-auto mt-10 bg-slate-800 rounded-xl shadow-lg p-8">

                <form onSubmit={handleValidation} className="space-y-5">

                    {/* SKU ID */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            SKU ID
                        </label>
                        <input
                            placeholder="e.g. BAR-PAS-PEN"
                            name="skuId"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={skuData.skuId}
                            onChange={onChangeHandler}
                        />
                        {errors.skuId && (
                            <p className="text-red-400 text-sm mt-1">{errors.skuId}</p>
                        )}
                    </div>

                    {/* ✅ NEW: Category field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Category
                        </label>
                        <input
                            list="categoryOptions"
                            placeholder="e.g. Food, Dairy, Beverage, Apparel"
                            name="category"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={skuData.category}
                            onChange={onChangeHandler}
                        />
                        {/* Predefined suggestions — user can also type a new one */}
                        <datalist id="categoryOptions">
                            <option value="Food" />
                            <option value="Dairy" />
                            <option value="Beverage" />
                            <option value="Apparel" />
                            <option value="Electronics" />
                            <option value="Stationery" />
                            <option value="Household" />
                        </datalist>
                        {errors.category && (
                            <p className="text-red-400 text-sm mt-1">{errors.category}</p>
                        )}
                    </div>

                    {/* SKU Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            SKU Description
                        </label>
                        <input
                            placeholder="e.g. Barilla Pasta Penne 500g"
                            name="skuDescription"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={skuData.skuDescription}
                            onChange={onChangeHandler}
                        />
                        {errors.skuDescription && (
                            <p className="text-red-400 text-sm mt-1">{errors.skuDescription}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
                    >
                        Save SKU
                    </button>

                </form>

                {/* Success message */}
                {flag && (
                    <div className="mt-6 bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                        <p className="text-green-400 font-medium mb-3">
                            ✅ SKU saved successfully!
                        </p>
                        <button
                            onClick={nextEntry}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition"
                        >
                            ➕ Add Another SKU
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SKUEntry;