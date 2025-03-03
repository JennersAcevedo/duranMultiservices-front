"use client";
import Image from "next/image";
import styles from "@/styles/appointment.module.css";
import Navbar from "@/components/navbar/navbar";

import { useEffect, useState } from "react";
import FooterContact from "@/components/footerContact/footer";
import axios from "axios";
import { DatePicker } from "@nextui-org/date-picker";
import { useRouter } from "next/navigation";

export default function Appointment() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    end: "",
    mode: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    referenceNumber: "",
    duration: "",
  });
  const [services, setServices] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [auxiliarDates, setAuxiliarDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [date, setDate] = useState([]);
  const router = useRouter();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log("values: ", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
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
        let token = getCookie("authToken");
        console.log(token)
       
        if (!token) {
          router.push("/login");
        }else{
        }
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const datesResponse = await axios.get(
          "http://localhost:4000/appointment/availability/45/dates/language/0",
          config
        );
        const datesData = await datesResponse.data.data;
        console.log(datesData);
        setAvailableDates(datesData.dates);
        setAuxiliarDates(datesData.datesAbr);
        let today = new Date();
        let urlDate =
          today.getUTCMonth() +
          1 +
          "-" +
          today.getUTCDate() +
          "-" +
          today.getUTCFullYear();
        const timesResponse = await axios.get(
          `http://localhost:4000/appointment/availability/45/date/${urlDate}`,
          config
        );
        console.log(new Date());
        console.log("times:", timesResponse);
        const timesData = await timesResponse.data.data.availability;
        let times = timesData.map((time) => ({
          start: time["start"],
          end: time["end"],
          show: time["start"] + " - " + time["end"],
        }));

        setAvailableTimes(times);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };
  const handleDateSelect = async (date, index) => {
    if (form["duration"] === "") {
      setSelectedDate(date);
 
      let token = getCookie("authToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token como Bearer
          "Content-Type": "application/json",
        },
      };
      const timesResponse = await axios.get(
        `http://localhost:4000/appointment/availability/45/date/${auxiliarDates[index]}`,
        config
      );

      const timesData = await timesResponse.data.data.availability;
      setForm({ ...form, date: date });
      setAvailableTimes(timesData);
      console.log("Fecha seleccionada:", date);
    } else {
    }
  };
  const handleTimeSelect = async (time, index) => {
    setSelectedTime(time);
    setForm({ ...form, time: time });
    console.log(time);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form["duration"] === ""|| form['service']==="") {
      let body = {
        title: form["service"] + " - " + form["referenceNumber"],
        start: form["time"],
        end: form["end"],
        date: form["date"],
        mode: form["mode"],
        reference: form["referenceNumber"],
      };
      let token = getCookie("authToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      };
      let appointmentResponse = await axios.post(
        "http://localhost:4000/appointment/add",
        body,
        config
      );
      console.log(appointmentResponse);
      console.log(form);
      if (appointmentResponse.data.success) {
        router.push("/checkout");
      }
    }
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
          <div style={{  position: 'absolute', left: "-9999px"  }}>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
            />
          </div>

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
                  className={`${styles.dateButton} ${
                    selectedDate === date ? styles.selected : ""
                  }`}
                  onClick={() => handleDateSelect(date, index)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="time">Hora</label>
          <div className={styles.appointmentScheduler}>
            <div className={styles.datesContainer}>
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={`${styles.dateButton} ${
                    selectedTime === time["start"] ? styles.selected : ""
                  }`}
                  name="time"
                  onClick={() => handleTimeSelect(time["start"], index)}
                >
                  {time["start"] + " - " + time["end"]}
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
            Ir al checkout
          </button>
        </form>
      </div>
      <FooterContact />
    </div>
  );
}
