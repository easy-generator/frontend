import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import { AuthProvider, SignInPage } from "@toolpad/core";
import { TextField, Button, Alert } from "@mui/material";
import "../styles/form-page.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn, signUp } from "../services/auth";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/inputs-validations";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameValidation, setNameValidations] = useState<string | null>(null);
  const [emailValidation, setEmailValidations] = useState<string | null>(null);
  const [passwordValidation, setPasswordValidations] = useState<string | null>(
    null
  );
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError = validateName(e.target.value);
    setNameValidations(nameError);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailError = validateEmail(e.target.value);
    setEmailValidations(emailError);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordError = validatePassword(e.target.value);
    setPasswordValidations(passwordError);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(email, password, name);
      const response: any = await signUp({ email, password, name });
      navigate("/login");
    } catch (err: any) {
      setAlert("email already exists");
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div>
      {alert && (
        <Alert severity="error" className="alert">
          {alert}
        </Alert>
      )}

      <div className="signin-page">
        <div className="left-side">
          <h1>Sign Up</h1>

          <div className="form-inputs">
            <TextField
              required
              id="name-input"
              label="Name"
              name="name"
              type="text"
              defaultValue=""
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleNameChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            {nameValidation && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {nameValidation}
              </p>
            )}

            <TextField
              required
              id="email-input"
              label="Email"
              name="email"
              type="email"
              defaultValue=""
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmailChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            {emailValidation && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {emailValidation}
              </p>
            )}

            <TextField
              required
              id="password-input"
              label="Password"
              type="password"
              name="password"
              defaultValue=""
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            {passwordValidation && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {passwordValidation}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              emailValidation || passwordValidation || nameValidation
                ? true
                : false
            }
            style={{
              opacity:
                emailValidation || passwordValidation || nameValidation
                  ? 0.5
                  : 1,
              cursor:
                emailValidation || passwordValidation || nameValidation
                  ? "not-allowed"
                  : "pointer",
            }}
            className="signin-btn"
          >
            Sign Up
          </button>
          <p>
            already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>

        <div className="right-side">
          <img src="images/easy.png" alt="logo" />
        </div>
      </div>
    </div>
  );
}
