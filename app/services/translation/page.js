"use client";
import Image from "next/image";
import styles from "@/styles/translation.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../../../assets/banner.webp";
import Title from "@/components/titles/title";
import Footer from "@/components/footer/footer";
import { useState } from "react";

export default function Services() {
  const services = [
    { id: 1, name: "Acta de Nacimiento" },
    { id: 2, name: "Acta de Matrimonio" },
    { id: 3, name: "Acta de Defuncion" },
  ];

  const genero = [
    { id: 1, name: "Masculino" },
    { id: 2, name: "Femenino" },
  ];

  const declarations = [
    { id: 1, name: "Tardía" },
    { id: 2, name: "Oportuna" },
  ];

  const [form, setForm] = useState({
    service: "",
    registration_date: "",
    birth_date: "",
    sex: "",
    circunscription: "",
    barcode: "",
    firstName: "",
    lastName: "",
    registration_no: "",
    folio: "",
    act: "",
    year: "",
    declaration_type: "",
    eventNumber: "",
    father: {
      firstName: "",
      lastName: "",
      registration_no: "",
    },
    mother: {
      firstName: "",
      lastName: "",
      registration_no: "",
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Formulario enviado", form);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <main className={styles.main}>
        <div className={styles.bannerContainer}>
          <Image
            src={banner}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.division}></div>
        <Title title="Traducción de documentos" />
        <div>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          {form.service === "Acta de Nacimiento" && (
            <div className={styles.container}>
              <h1 className={styles.title}>
                Traducción de Acta de Nacimiento
              </h1>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="firstName">Nombre de titular</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="lastName">Apellido de titular</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="registration_no">Número de registro</label>
                <input
                  type="text"
                  id="registration_no"
                  name="registration_no"
                  value={form.registration_no}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="registration_date">Fecha de registro</label>
                <input
                  type="text"
                  id="registration_date"
                  name="registration_date"
                  value={form.registration_date}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="birth_date">Fecha de Nacimiento</label>
                <input
                  type="text"
                  id="birth_date"
                  name="birth_date"
                  value={form.birth_date}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="circunscription">Circunscripción</label>
                <input
                  type="text"
                  id="circunscription"
                  name="circunscription"
                  value={form.circunscription}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="barcode">Código de Barra</label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="folio">Folio</label>
                <input
                  type="text"
                  id="folio"
                  name="folio"
                  value={form.folio}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="act">Acta</label>
                <input
                  type="text"
                  id="act"
                  name="act"
                  value={form.act}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="year">Año</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="declaration_type">
                  Tipo de Declaración
                </label>
                <select
                  id="declaration_type"
                  name="declaration_type"
                  value={form.declaration_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona el tipo de declaración</option>
                  {declarations.map((declaration) => (
                    <option key={declaration.id} value={declaration.name}>
                      {declaration.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="eventNumber">Número de Evento</label>
                <input
                  type="text"
                  id="eventNumber"
                  name="eventNumber"
                  value={form.eventNumber}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="sex">Género</label>
                <select
                  id="sex"
                  name="sex"
                  value={form.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un género</option>
                  {genero.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>

                {/* Información de los padres */}

                <h2>Información del Padre</h2>
                <label htmlFor="fatherFirstName">Nombre del Padre</label>
                <input
                  type="text"
                  id="fatherFirstName"
                  name="father.firstName"
                  value={form.father.firstName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="fatherLastName">Apellido del Padre</label>
                <input
                  type="text"
                  id="fatherLastName"
                  name="father.lastName"
                  value={form.father.lastName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="fatherRegistrationNo">
                  Número de registro del Padre
                </label>
                <input
                  type="text"
                  id="fatherRegistrationNo"
                  name="father.registration_no"
                  value={form.father.registration_no}
                  onChange={handleChange}
                  required
                />

                <h2>Información de la Madre</h2>
                <label htmlFor="motherFirstName">Nombre de la Madre</label>
                <input
                  type="text"
                  id="motherFirstName"
                  name="mother.firstName"
                  value={form.mother.firstName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="motherLastName">Apellido de la Madre</label>
                <input
                  type="text"
                  id="motherLastName"
                  name="mother.lastName"
                  value={form.mother.lastName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="motherRegistrationNo">
                  Número de registro de la Madre
                </label>
                <input
                  type="text"
                  id="motherRegistrationNo"
                  name="mother.registration_no"
                  value={form.mother.registration_no}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className={styles.submitButton}>
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
