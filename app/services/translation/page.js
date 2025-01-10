"use client";
import Image from "next/image";
import styles from "@/styles/translation.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../../../assets/banner.webp";
import Title from "@/components/titles/title";
import Footer from "@/components/footer/footer";
import { useState } from "react";
import GuessNavBar from "@/components/GuessNavbar/guessNavBar";
import axios from "axios";

export default function Services() {
  const services = [
    { id: 1, name: "Acta de Nacimiento (Dominicana)" },
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
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log("values: ", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const [form, setForm] = useState({
    name: "",
    barcode: "",
    event: "",
    circunscription: "",
    circunscription_city: "",
    registration_date: "",
    book_no: "",
    declaration_type: "",
    folio_no: "",
    act_no: "",
    year: "",
    id: "",
    sex: "",
    birth_place: "",
    birth_city: "",
    birth_date: "",
    father: {
      name: "",
      nationality: "",
      id: "",
    },
    mother: {
      name: "",
      nationality: "",
      id: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Manejar campos anidados
    const keys = name.split("."); // Divide "father.name" en ["father", "name"]
  
    if (keys.length > 1) {
      // Si es un campo anidado, crea una copia del objeto anidado y actualiza el campo
      setForm((prevForm) => ({
        ...prevForm,
        [keys[0]]: {
          ...prevForm[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      // Si no es anidado, actualiza normalmente
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const sendTranslationInfo = async (form)=>{
    let token= getCookie("authToken")
    let url = `http://localhost:4000/translation/new/birth`
    let config={
      headers: {
        "Authorization": `Bearer ${token}`, // Incluye el token como Bearer
        "Content-Type": "application/json",
      }
    }
    let body={
      "barcode":form['barcode'],
      "event":form['event'],
      "circumscription":form['circunscription'],
      "circumscription_city":form['circunscription_city'],
      "registration_date":form['registration_date'],
      "book_no":form['book_no'],
      "declaration_type":form['declaration_type'],
      "folio_no":form['folio_no'],
      "act_no":form['act_no'],
      "year":form['year'],
      "name":form['name'],
      "identity_number":form['id'],
      "sex":form['sex'],
      "birth_place":form['birth_place'],
      "birth_city":form['birth_city'],
      "birth_date":form['birth_date'],
      "father_name":form['father']['name'],
      "father_nationality":form['father']['nationality'],
      "father_identity":form['father']['id'],
      "mother_name":form['mother']['name'],
      "mother_nationality":form['mother']['nationality'],
      "mother_identity":form['mother']['id']
    }
    
    const formResponse = await axios.post(url, body,  config)
    return formResponse
  }
  const downloadPdf = (base64String, fileName) => {
    // Convierte el Base64 a un Blob
    const byteCharacters = atob(base64String);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
  
    // Crea un enlace temporal para la descarga
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; // Nombre del archivo que el usuario verá
    document.body.appendChild(link);
    link.click();
  
    // Limpia el enlace temporal
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formResponse = await sendTranslationInfo(form)
    if(formResponse && formResponse.data.success){
      downloadPdf(formResponse.data.data, "document.pdf");
    }
    console.log("Formulario enviado", form);
  };

  return (
    <div className={styles.page}>
      <GuessNavBar />
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
          {form.service === "Acta de Nacimiento (Dominicana)" && (
            <div className={styles.container}>
              <h1 className={styles.title}>Traducción de Acta de Nacimiento</h1>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre de titular</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="barcode">Codigo de barra</label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="eventNumber">Número de Evento</label>
                <input
                  type="text"
                  id="eventNumber"
                  name="eventNumber"
                  value={form.eventNumber}
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

                <label htmlFor="circunscription_city">
                  Ciudad de Circunscripción
                </label>
                <input
                  type="text"
                  id="circunscription_city"
                  name="circunscription_city"
                  value={form.circunscription_city}
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
                <label htmlFor="book_no">Número de libro</label>
                <input
                  type="text"
                  id="book_no"
                  name="book_no"
                  value={form.book_no}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="declaration_type">Tipo de Declaración</label>
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

                <label htmlFor="folio_no">Folio</label>
                <input
                  type="text"
                  id="folio_no"
                  name="folio_no"
                  value={form.folio_no}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="act_no">Acta</label>
                <input
                  type="text"
                  id="act_no"
                  name="act_no"
                  value={form.act_no}
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

                <label htmlFor="id">Numero de Cedula</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={form.id}
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

                <label htmlFor="birth_place">Lugar de Nacimiento</label>
                <input
                  type="text"
                  id="birth_place"
                  name="birth_place"
                  value={form.birth_place}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="birth_date">Ciudad de Nacimiento</label>
                <input
                  type="text"
                  id="birth_city"
                  name="birth_city"
                  value={form.birth_city}
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

                {/* Información de los padres */}

                <h2>Información del Padre</h2>
                <label htmlFor="father.name">Nombre del Padre</label>
                <input
                  type="text"
                  id="father.name"
                  name="father.name"
                  value={form.father.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="fatherNationality">Nacionalidad del Padre</label>
                <input
                  type="text"
                  id="fatherNationality"
                  name="father.nationality"
                  value={form.father.nationality}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="fatherRegistrationNo">
                  Número de cedula del Padre
                </label>
                <input
                  type="text"
                  id="fatherRegistrationNo"
                  name="father.id"
                  value={form.father.id}
                  onChange={handleChange}
                  required
                />

                <h2>Información de la Madre</h2>
                <label htmlFor="motherFirstName">Nombre de la Madre</label>
                <input
                  type="text"
                  id="motherFirstName"
                  name="mother.name"
                  value={form.mother.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="motherNationality">Nacionalidad de la Madre</label>
                <input
                  type="text"
                  id="motherNationality"
                  name="mother.nationality"
                  value={form.mother.nationality}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="motherRegistrationNo">
                  Número de registro de la Madre
                </label>
                <input
                  type="text"
                  id="motherRegistrationNo"
                  name="mother.id"
                  value={form.mother.id}
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
