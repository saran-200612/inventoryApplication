import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [inventoryUser, setInventoryUser] = useState({
        username: "",
        password: "",
        personalName: "",
        email: "",
        role: "",
    });
    const [flag, setFlag] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setFlag(false);
    }, []);

    const createNewUser = (event) => {
        event.preventDefault();
        if (inventoryUser.password === confirmPassword) {
            registerNewUser(inventoryUser).then(() => {
                setFlag(true);
            });
        }
    };

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(false);
        const name = event.target.name;
        const value = event.target.value;
        setInventoryUser(values => ({ ...values, [name]: value }));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!inventoryUser.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!inventoryUser.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }
        // ✅ FIXED: was inventoryUser.passwordlength (missing dot) — now inventoryUser.password.length
        else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) {
            tempErrors.password = "Password must be 5-10 characters long";
            isValid = false;
        }
        else if (inventoryUser.password !== confirmPassword) {
            tempErrors.password = "Both the passwords are not matched";
            isValid = false;
        }

        if (!inventoryUser.personalName.trim()) {
            tempErrors.personalName = "Personal Name is required";
            isValid = false;
        }

        if (!inventoryUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!emailPattern.test(inventoryUser.email)) {
            tempErrors.email = "Invalid Email Format";
            isValid = false;
        }

        if (!inventoryUser.role.trim()) {
            tempErrors.role = "Role is required";
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewUser(event);
        }
    };

    const returnBack = () => {
        navigate('/');
    };

    return (
        <div>
            <div className=".container">
                <div className="row">
                    <div className="card col-md-2 offset-md-3">
                        <div className="login-box">
                            <h2 className="text-center"><u>New User Registration</u></h2>
                            <form method="post">
                                <div className="form-group">
                                    <label>User Name: </label>
                                    <input
                                        placeholder="username"
                                        name="username"
                                        className="form-control"
                                        value={inventoryUser.username}
                                        onChange={onChangeHandler}
                                    />
                                    {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Password: </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={inventoryUser.password}
                                        onChange={onChangeHandler}
                                    />
                                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Retype your Password: </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                    {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                                </div>

                                <div className="form-group">
                                    <label>User's Personal Name: </label>
                                    <input
                                        placeholder="personal name"
                                        name="personalName"
                                        className="form-control"
                                        value={inventoryUser.personalName}
                                        onChange={onChangeHandler}
                                    />
                                    {errors.personalName && <p style={{ color: "red" }}>{errors.personalName}</p>}
                                </div>

                                <div className="form-group">
                                    <label>User Email: </label>
                                    <input
                                        placeholder="email"
                                        name="email"
                                        className="form-control"
                                        value={inventoryUser.email}
                                        onChange={onChangeHandler}
                                    />
                                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Select Role: </label>
                                    <input
                                        list="types"
                                        name="role"
                                        className="form-control"
                                        value={inventoryUser.role}
                                        onChange={onChangeHandler}
                                    />
                                    <datalist id="types">
                                        <option value="Manager" />
                                        <option value="Vendor" />
                                        <option value="Admin" />
                                    </datalist>
                                    {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
                                </div>

                                <br />
                                <button className="btn btn-primary" onClick={handleValidation}>Submit</button>
                            </form>

                            <br />
                            <div>
                                {flag && (
                                    <p style={{ color: "blue" }}>
                                        New User Created...Go To Login:{" "}
                                        <button className="btn btn-success" onClick={returnBack}>Login</button>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;