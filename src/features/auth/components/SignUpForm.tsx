import * as React from "react";
import { TextField, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/form-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../services/auth";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/inputs-validations";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
              type={showPassword ? "text" : "password"}
              name="password"
              defaultValue=""
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
