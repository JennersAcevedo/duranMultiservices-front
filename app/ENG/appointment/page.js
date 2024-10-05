'use client'
import Image from "next/image";
import styles from "@/styles/services.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../../assets/banner.webp";
import Title from "@/components/titles/title";
import HomeServiceCard from "@/components/card/HomeServiceCard";
import Footer from "@/components/footer/footer";
import woman  from "../../assets/woman.webp";
import document from "../../assets/document.webp";
import divorce from "../../assets/divorce.webp";
import american from "../../assets/american-flag.webp";
import { InlineWidget } from "react-calendly";
import { useEffect, useState } from "react";

export default function Appointment() {
  const [form, setForm] = useState({
    service: '',
    date: '',
    time: '',
    mode: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    referenceNumber: '',
  });
  const [services, setServices] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Obtener datos desde la API
    async function fetchData() {
      try {
        const servicesResponse = await fetch('https://api.example.com/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        const datesResponse = await fetch('https://api.example.com/available-dates');
        const datesData = await datesResponse.json();
        setAvailableDates(datesData);

        const timesResponse = await fetch('https://api.example.com/available-times');
        const timesData = await timesResponse.json();
        setAvailableTimes(timesData);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para enviar la cita
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendar una Cita</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="service">Servicio</label>
        <select id="service" name="service" value={form.service} onChange={handleChange} required>
          <option value="">Selecciona un servicio</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>{service.name}</option>
          ))}
        </select>

        <label htmlFor="date">Fecha</label>
        <select id="date" name="date" value={form.date} onChange={handleChange} required>
          <option value="">Selecciona una fecha</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        <label htmlFor="time">Hora</label>
        <select id="time" name="time" value={form.time} onChange={handleChange} required>
          <option value="">Selecciona una hora</option>
          {availableTimes
            .filter(time => time.date === form.date)
            .map((time) => (
              <option key={time.value} value={time.value}>{time.label}</option>
            ))
          }
        </select>

        <label htmlFor="mode">Modalidad</label>
        <select id="mode" name="mode" value={form.mode} onChange={handleChange} required>
          <option value="">Selecciona una modalidad</option>
          <option value="virtual">Virtual</option>
          <option value="presencial">Presencial</option>
        </select>

        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Teléfono (Opcional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label htmlFor="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="referenceNumber">Número de Referencia</label>
        <input
          type="text"
          id="referenceNumber"
          name="referenceNumber"
          value={form.referenceNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
}
