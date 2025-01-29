"use client";
import styles from "@/styles/admin.module.css";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar/adminNavbar";
import { useRouter } from "next/navigation";


export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    validate: "",
    role: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleValidationVisibility = () => {
    setShowValidation(!showValidation);
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log('values: ', value)
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
const router = useRouter();
useEffect(() => {
 async function tokenValidation() {
   let token = getCookie("authToken");
       console.log(token)
      
       if (!token) {
         console.log('no hay token')
         router.push("/login");
       }else{
         console.log('hay token')
       }
 }
 tokenValidation();
}, []);
  const sendLoginInfo = async (
    user,
    password,
    validate,
    name,
    email,
    phone
  ) => {
    console.log("username: ", user);
    console.log("password: ", password);

    if (password === validate) {
      let token = getCookie("authToken");
      let url = `http://localhost:4000/admin/create/user`;
      console.log("url: ", url);
      let body = {
        customer_name: name,
        customer_username: user,
        customer_email: email,
        customer_phone: phone,
        customer_password: password,
      };
      console.log(body);
      let config = {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token como Bearer
          "Content-Type": "application/json",
        },
      };
      const creationResponse = await axios.post(url, body, config);
      console.log(creationResponse.data);
    } else {
      alert("Password doesn't match");
      setForm({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        validate: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.role === "") {
      let login = await sendLoginInfo(
        form.username,
        form.password,
        form.validate,
        form.name,
        form.email,
        form.phone
      );
      console.log("Formulario enviado:", form, "Recordarme:", rememberMe);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className={styles.body}>
        <div className={styles.logincontainer}>
          <div className={styles.loginwelcome}>
            <h1>Create a New user!</h1>
          </div>
          <div className={styles.loginform}>
            <h2>Create a new user</h2>
            <p>Please fill the fields.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <div style={{  position: 'absolute', left: "-9999px"  }}>
                <label htmlFor="role">Role:</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
              <label htmlFor="username">phone</label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
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

              <label htmlFor="validation">Confirm password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showValidation ? "text" : "password"}
                  id="validation"
                  name="validate" // Cambiado a "validate"
                  placeholder="Confirm password"
                  value={form.validate}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  onClick={toggleValidationVisibility}
                  className={styles.toggleButton}
                >
                  <FontAwesomeIcon icon={showValidation ? faEyeSlash : faEye} />
                </button>
              </div>

              <button type="submit" className={styles.loginbutton}>
                Create user
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
