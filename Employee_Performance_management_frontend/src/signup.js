import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
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
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password is required.");
            return false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const isValidConfirmPassword = validateConfirmPassword();

        if (isValidEmail && isValidPassword && isValidConfirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/");
            } catch (error) {
                // Check the error code returned by Firebase
                switch (error.code) {
                    case "auth/weak-password":
                        setNotice("Password is too weak. Please choose a stronger password.");
                        break;
                    case "auth/email-already-in-use":
                        setNotice("The email address is already in use.");
                        break;
                    case "auth/invalid-email":
                        setNotice("Invalid email address.");
                        break;
                    default:
                        setNotice("Sorry, something went wrong. Please try again.");
                        break;
                }
            }
        }
    };


    return(
        <div className="container">
            <div className="row justify-content-center">
                {notice && <div className="alert alert-warning" role="alert">{notice}</div>}
                <form className="col-md-4 mt-3 pt-3 pb-3" onSubmit={handleSubmit}>
                    <div className={`form-floating mb-3 ${emailError ? "has-validation" : ""}`}>
                        <input
                            id="signupEmail"
                            type="email"
                            className={`form-control ${emailError && "is-invalid"}`}
                            aria-describedby="emailHelp"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    <div className={`form-floating mb-3 ${passwordError ? "has-validation" : ""}`}>
                        <input
                            id="signupPassword"
                            type="password"
                            className={`form-control ${passwordError && "is-invalid"}`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>
                    <div className={`form-floating mb-3 ${confirmPasswordError ? "has-validation" : ""}`}>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={`form-control ${confirmPasswordError && "is-invalid"}`}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary pt-3 pb-3">Signup</button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>Go back to login? <Link to="/">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
