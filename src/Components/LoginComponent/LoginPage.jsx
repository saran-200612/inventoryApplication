import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [flag, setFlag] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const validateLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        validateUser(loginData.username, loginData.password)
            .then((response) => {
                let role = String(response.data);
                if (role === "Admin")
                    navigate("/admin-menu");
                else if (role === "Manager")
                    navigate("/manager-menu");
                else if (role === "Vendor")
                    navigate("/vendor-menu");
                else
                    setFlag(false);
            })
            .catch(() => setFlag(false))
            .finally(() => setIsLoading(false));
    };

    const onChangeHandler = (event) => {
        setFlag(true);
        const { name, value } = event.target;
        setLoginData(values => ({ ...values, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!loginData.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!loginData.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) validateLogin(event);
    };

    const registerNewUser = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 px-4 relative overflow-hidden">

            {/* Floating Glow */}
            <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
            <div className="absolute w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

            <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 relative z-10">

                <div className="text-center mb-8">
                    <div className="text-5xl mb-3 drop-shadow-lg">🔐</div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Inventory System
                    </h2>
                    <p className="text-white/80 text-sm mt-2">
                        Secure login to continue
                    </p>
                </div>

                <form onSubmit={handleValidation} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 ${
                                errors.username ? 'border-2 border-red-500' : ''
                            }`}
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <p className="text-red-300 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={onChangeHandler}
                            className={`w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 ${
                                errors.password ? 'border-2 border-red-500' : ''
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-300 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Invalid Login */}
                    {!flag && (
                        <div className="bg-red-500/20 text-red-200 text-sm p-3 rounded-lg text-center border border-red-400">
                            Invalid username or password
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-white/90">
                    Don’t have an account?{" "}
                    <button
                        onClick={registerNewUser}
                        className="text-pink-300 font-semibold hover:underline"
                    >
                        Register
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;