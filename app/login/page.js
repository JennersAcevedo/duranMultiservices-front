"use client";
import styles from "@/styles/login.module.css";
import Navbar from "@/components/navbar/navbar";
import { useState } from "react";
import GuessNavBar from "@/components/GuessNavbar/guessNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form, "Recordarme:", rememberMe);
  };

  return (
    <div>
      <Navbar/>
    <div className={styles.body}>
      <div className={styles.logincontainer}>
        <div className={styles.loginwelcome}>
          <h1>Welcome Back!</h1>
        </div>
        <div className={styles.loginform}>
          <h2>Login</h2>
          <p>Welcome back! Please login to your account.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">User Name</label>
            <input
              type="email"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className={`${styles.input} ${styles.passwordInput}`}
            />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.toggleButton}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <button type="submit" className={styles.loginbutton}>
              Login
            </button>
          </form>
        
        </div>
      </div>
    </div>
    </div>
  );
}
