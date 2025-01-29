"use client";
import styles from "@/styles/login.module.css";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import GuessNavBar from "@/components/GuessNavbar/guessNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", phone: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  console.log("Router: ", router);
  // useEffect(() => {
  //   if (login && login.data.success) {
  //     console.log("Login exitoso:", login);
  //     router.push("/services/translation"); // Redirige después de login
  //   }
  // }, [login]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log("values: ", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const sendLoginInfo = async (user, password) => {
    if (form['phone']==="") {
      let token = getCookie("authToken");
      console.log("token: ", token);
      console.log("username: ", user);
      console.log("passowrd: ", password);
      let url = `http://localhost:4000/auth/${user}/${password}`;
      const loginResponse = await axios.get(url, {
        withCredentials: true,
      });
      return loginResponse;
    }
  };
  const handleSubmit = async (e) => {
    if (form["phone"] === "") {
      let login = await sendLoginInfo(form.username, form.password);
      if (login && login.data.success) {
        if (login.data.data.user_type === "customer") {
          router.push("/services/translation");
        }
        if (login.data.data.user_type === "admin") {
          router.push("/admin");
        }
        console.log("Login exitoso:", login);
      }
      console.log(login);
      e.preventDefault();
      console.log("Formulario enviado:", form, "Recordarme:", rememberMe);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.logincontainer}>
          <div className={styles.loginwelcome}>
            <h1>Welcome Back!</h1>
          </div>
          <div className={styles.loginform}>
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
            <form>
              <label htmlFor="username">User Name</label>
              <input
                type="email"
                id="username"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <div style={{  position: 'absolute', left: "-9999px"  }}>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
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
              <button
                type="button"
                onClick={handleSubmit}
                className={styles.loginbutton}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
