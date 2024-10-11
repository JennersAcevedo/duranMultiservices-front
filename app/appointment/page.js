"use client";
import Image from "next/image";
import styles from "@/styles/appointment.module.css";
import Navbar from "@/components/navbar/navbar";

import { useEffect, useState } from "react";
import FooterContact from "@/components/footerContact/footer";
import axios from "axios";
import { DatePicker } from "@nextui-org/date-picker";

export default function Appointment() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    mode: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    referenceNumber: "",
  });
  const [services, setServices] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const servicesData = [
          {
            id: 1,
            name: "service 1",
          },
        ];
        setServices(servicesData);

        const datesResponse = await axios.get(
          "http://localhost:4000/appointment/availability/45/dates/language/0"
        );
        const datesData = await datesResponse.data.data;
        console.log(datesData);
        setAvailableDates(datesData);
        let today = new Date();
        let urlDate =
          today.getUTCMonth() +
          "-" +
          today.getUTCDate() +
          "-" +
          today.getUTCFullYear();
        const timesResponse = await axios.get(
          `http://localhost:4000/appointment/availability/45/date/${urlDate}`
        );
        console.log(new Date());
        console.log(timesResponse);
        const timesData = await timesResponse.data.data.availability;
        let times = timesData.map(time =>({
          "start":time['start'],
          "end":time['end'],
          "show":time['start']+' - '+time['end']
        }))
        setAvailableTimes(times);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(date);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(date);
  };
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    const timesResponse = await axios.get(
      `http://localhost:4000/appointment/availability/45/date/${new Date()}`
    );
    console.log(new Date());
    console.log(timesResponse);
    const timesData = await timesResponse.data.data;
    setAvailableTimes(timesData);
    console.log("Fecha seleccionada:", date);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Agendar una Cita</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <label htmlFor="service">Servicio</label>
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

          <label htmlFor="date">Fecha</label>
          <div className={styles.appointmentScheduler}>
            <div className={styles.datesContainer}>
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  className={styles.dateButton}
               
                  onClick={() => handleDateSelect(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="time">Hora</label>
          <div className={styles.appointmentScheduler}>
            <div className={styles.datesContainer}>
              {availableTimes.map((start, index) => (
                <button
                  key={index}
                  className={styles.dateButton}
                  onClick={() => handleDateSelect(start['start'])}
                >
                  {start['show']}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="mode">Modalidad</label>
          <select
            id="mode"
            name="mode"
            value={form.mode}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una modalidad</option>
            <option value="virtual">Virtual</option>
            <option value="presencial">Presencial</option>
          </select>

          <label htmlFor="referenceNumber">Número de Referencia</label>
          <input
            type="text"
            id="referenceNumber"
            name="referenceNumber"
            value={form.referenceNumber}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Agendar Cita
          </button>
        </form>
      </div>
      <FooterContact />
    </div>
  );
}
