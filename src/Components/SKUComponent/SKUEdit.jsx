import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from '../../Services/SKUService';

const SKUEdit = () => {

    const navigate = useNavigate();
    const param = useParams();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const [sku, setSku] = useState({
        skuId: "",
        category: "",
        skuDescription: "",
    });

    useEffect(() => {
        getSKUById(param.skuno).then((response) => {
            setSku(response.data);
            setLoading(false);
        }).catch(() => {
            alert("Failed to load SKU data.");
            setLoading(false);
        });
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        // ✅ FIXED: use setState instead of direct mutation
        setSku(prev => ({ ...prev, [name]: value }));
    };

    const editSKU = (event) => {
        event.preventDefault();
        updateSKU(sku).then(() => {
            alert("SKU Updated Successfully!");
            // ✅ FIXED: was /sku-list which doesn't exist in App.js
            navigate("/sku-repo");
        }).catch(() => {
            alert("Failed to update SKU. Please try again.");
        });
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!sku.category.trim()) {
            tempErrors.category = "Category is required";
            isValid = false;
        }

        if (!sku.skuDescription.trim()) {
            tempErrors.skuDescription = "SKU Description is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) editSKU(event);
    };

    const returnBack = () => {
        // ✅ FIXED: was /sku-list which doesn't exist in App.js
        navigate("/sku-repo");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <p className="text-slate-400">Loading SKU data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            {/* Header */}
            <div className="bg-slate-800 shadow-lg px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">✏️ Edit SKU</h2>
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

                    {/* SKU ID — read only */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            SKU ID
                        </label>
                        <input
                            className="w-full px-4 py-2 rounded-lg bg-slate-600 border border-slate-500 text-slate-400 cursor-not-allowed"
                            value={sku.skuId}
                            readOnly
                        />
                    </div>

                    {/* Category — editable */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Category
                        </label>
                        <input
                            list="categoryOptions"
                            name="category"
                            placeholder="e.g. Food, Dairy, Beverage, Apparel"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sku.category || ""}
                            onChange={onChangeHandler}
                        />
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

                    {/* Description — editable */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            SKU Description
                        </label>
                        <input
                            name="skuDescription"
                            placeholder="Enter SKU description"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sku.skuDescription || ""}
                            onChange={onChangeHandler}
                        />
                        {errors.skuDescription && (
                            <p className="text-red-400 text-sm mt-1">{errors.skuDescription}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
                        >
                            💾 Update SKU
                        </button>
                        <button
                            type="button"
                            onClick={returnBack}
                            className="flex-1 bg-slate-600 hover:bg-slate-500 py-2 rounded-lg font-semibold transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SKUEdit;