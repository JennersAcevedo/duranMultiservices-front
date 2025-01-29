'use client'
import Image from "next/image";
import styles from "@/styles/footer.module.css";
import logo from "../../assets/logo.webp"; // Ajusta la ruta según tu estructura de proyecto
import { useState } from "react";

export default function Footer() {
  const [form, setForm] = useState({ username: "", password: "", phone: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    <footer className={styles.footer}>
      {/* Logo en el lado izquierdo */}
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={200} height={200} />
      </div>

      {/* Formulario de contacto */}
      <div className={styles.contactForm}>
        <h2>Contacto</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ position: "absolute", left: "-9999px" }}>
            <label htmlFor="phone">phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje"
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className={styles.loginbutton}>Enviar</button>
        </form>
      </div>

      {/* Links útiles */}
      <div className={styles.usefulLinks}>
        <h2>Enlaces de ayuda</h2>
        <ul>
          <li>
            <a href="#">Política de Privacidad</a>
          </li>
          <li>
            <a href="#">Términos de Servicio</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Soporte</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
