import * as React from "react";
import { TextField, Alert } from "@mui/material";
import "../styles/form-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../services/auth";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/inputs-validations";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidations] = useState<string | null>(null);
  const [passwordValidation, setPasswordValidations] = useState<string | null>(
    null
  );
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();
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
      const response:any = await signIn({ email, password });
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (err: any) {
      setAlert("Invalid email or password");
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
          <h1>Sign In</h1>

          <div className="form-inputs">
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
            disabled={emailValidation || passwordValidation ? true : false}
            style={{
              opacity: emailValidation || passwordValidation ? 0.5 : 1,
              cursor:
                emailValidation || passwordValidation
                  ? "not-allowed"
                  : "pointer",
            }}
            className="signin-btn"
          >
            Sign In
          </button>
          <p>
            create an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <div className="right-side">
          <img src="images/easy.png" alt="logo" />
        </div>
      </div>
    </div>
  );
}
