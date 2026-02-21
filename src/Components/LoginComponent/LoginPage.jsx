import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../services/LoginService";


const LoginPage = () => {
    let navigate = useNavigate();
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
            .catch(() => {
                setFlag(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(true);
        const name = event.target.name;
        const value = event.target.value;
        setLoginData(values => ({ ...values, [name]: value }));

        // Clear error for the field being edited
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
        if (isValid) {
            validateLogin(event);
        }
    };

    const registerNewUser = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="min-vh-100 d-flex align-items-center bg-primary bg-gradient">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

                        {/* Login Card */}
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4 p-sm-5">

                                {/* Header */}
                                <div className="text-center mb-4">
                                    <div className="bg-primary bg-gradient rounded-4 d-inline-flex p-3 mb-3 shadow">
                                        <span style={{ fontSize: '2.5rem' }}>🔐</span>
                                    </div>
                                    <h2 className="fw-bold mb-2">Welcome Back</h2>
                                    <p className="text-muted mb-0">Sign in to access your inventory dashboard</p>
                                </div>

                                {/* Login Form */}
                                <form onSubmit={handleValidation}>

                                    {/* Username Field */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-semibold">
                                            <span className="me-2">👤</span>
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            type="text"
                                            placeholder="Enter your username"
                                            name="username"
                                            className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                                            value={loginData.username}
                                            onChange={onChangeHandler}
                                            autoComplete="username"
                                        />
                                        {errors.username && (
                                            <div className="invalid-feedback d-flex align-items-center">
                                                <span className="me-1">⚠️</span>
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold">
                                            <span className="me-2">🔒</span>
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                            value={loginData.password}
                                            onChange={onChangeHandler}
                                            autoComplete="current-password"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback d-flex align-items-center">
                                                <span className="me-1">⚠️</span>
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Invalid Credentials Error */}
                                    {!flag && (
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <span className="me-2">❌</span>
                                            <span>Invalid username or password. Please try again.</span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="d-grid gap-2 mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg fw-semibold"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In
                                                    <span className="ms-2">→</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Divider */}
                                <div className="d-flex align-items-center my-4">
                                    <hr className="flex-grow-1" />
                                    <span className="px-3 text-muted small">or</span>
                                    <hr className="flex-grow-1" />
                                </div>

                                {/* Register Section */}
                                <div className="text-center">
                                    <p className="text-muted mb-3">Don't have an account?</p>
                                    <div className="d-grid">
                                        <button
                                            onClick={registerNewUser}
                                            className="btn btn-outline-primary btn-lg fw-semibold"
                                        >
                                            <span className="me-2">✨</span>
                                            Create New Account
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;