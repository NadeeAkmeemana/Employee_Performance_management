import React, { useState } from "react";
import { auth } from "./firebase"; // Assuming Firebase is set up
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [notice, setNotice] = useState("");

    const validateEmail = () => {
        if (!email) {
            setEmailError("Email is required.");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("Password is required.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();

        if (isValidEmail && isValidPassword) {
            try {
                // Attempt to sign in the user with Firebase
                await signInWithEmailAndPassword(auth, email, password);

                // Check if the email is "admin@gmail.com"
                if (email === "admin@gmail.com") {
                    navigate("/employee"); // Navigate to Employee page if it's admin
                } else {
                    setNotice("You do not have permission to access the employee page.");
                }
            } catch (error) {
                setNotice("You entered a wrong username or password.");
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                {notice && <div className="alert alert-warning" role="alert">{notice}</div>}
                <form className="col-md-4 mt-3 pt-3 pb-3" onSubmit={handleSubmit}>
                    <div className={`form-floating mb-3 ${emailError ? "has-validation" : ""}`}>
                        <input
                            type="email"
                            className={`form-control ${emailError ? "is-invalid" : ""}`}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    <div className={`form-floating mb-3 ${passwordError ? "has-validation" : ""}`}>
                        <input
                            type="password"
                            className={`form-control ${passwordError ? "is-invalid" : ""}`}
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary pt-3 pb-3">Submit</button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>Need to sign up for an account? <Link to="./signup">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
