'use client'
import styles from "@/styles/contact.module.css";
import Navbar from "@/components/navbar/navbar";
import Title from "@/components/titles/title";
import { useState } from "react";
import FooterContact from "@/components/footerContact/footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    phone:'809'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form['phone']==='809'|| form['email']==='') {
        //Agregar llamada al BackEnd para enviar el email
    console.log(form);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.division}></div>
      <Title title="Contacto" />
      <div className={styles.info}>
        <div className={styles.details}>
          <h2>Información de contacto</h2>
          <p><strong>Dirección:</strong> Calle Principal #123, Ciudad, País</p>
          <p><strong>Teléfono:</strong> +1 123-456-7890</p>
          {/* <p><strong>Email:</strong> contacto@notario.com</p> */}
          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Envíanos un mensaje</h2>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
           <div style={{ position: 'absolute', left: "120vw" }}>
            <label htmlFor="phone">phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <FooterContact/>
    </div>
  );
}