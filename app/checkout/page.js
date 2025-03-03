"use client";
import Image from "next/image";
import styles from "@/styles/appointment.module.css";
import Navbar from "@/components/navbar/navbar";

import { useEffect, useState } from "react";
import FooterContact from "@/components/footerContact/footer";
import axios from "axios";
import { DatePicker } from "@nextui-org/date-picker";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [services, setServices] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [auxiliarDates, setAuxiliarDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  // const [date, setDate] = useState([]);
  const countries = [
    {
      id: 1,
      name: "service 1",
      code:
    },
  ];
  setCountry(countries);
  const router = useRouter();
  const appointment_id = router.query;
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
        console.log(token);

        if (!token) {
          router.push("/login");
        } else {
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
  // const handleDateSelect = async (date, index) => {
  //   if (form["duration"] === "") {
  //     setSelectedDate(date);

  //     let token = getCookie("authToken");
  //     let config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Incluye el token como Bearer
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const timesResponse = await axios.get(
  //       `http://localhost:4000/appointment/availability/45/date/${auxiliarDates[index]}`,
  //       config
  //     );

  //     const timesData = await timesResponse.data.data.availability;
  //     setForm({ ...form, date: date });
  //     setAvailableTimes(timesData);
  //     console.log("Fecha seleccionada:", date);
  //   } else {
  //   }
  // };
  // const handleTimeSelect = async (time, index) => {
  //   setSelectedTime(time);
  //   setForm({ ...form, time: time });
  //   console.log(time);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form["duration"] === "" || form["service"] === "") {
      let body = {
        email: form["email"],
        phone: form["phone"],
        line1: form["line1"],
        line2: form["line2"],
        city: form["city"],
        state: form["state"],
        country: form["country"],
        zip: form["zip"],
        appointment:appointment_id
      };
      let token = getCookie("authToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let appointmentResponse = await axios.post(
        "http://localhost:4000/payment/session",
        body,
        config
      );
      console.log(appointmentResponse);
      console.log(form);
      if (appointmentResponse.data.success) {
      }
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Agendar una Cita - Checkout</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Teléfono </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <label htmlFor="referenceNumber">Direccion</label>

          <label htmlFor="line1">Linea 1</label>
          <input
            type="text"
            id="line1"
            name="line1"
            value={form.line1}
            onChange={handleChange}
            required
          />

          <label htmlFor="line1">Linea 2</label>
          <input
            type="text"
            id="line2"
            name="line2"
            value={form.line2}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="service">Servicio</label>
          <select
            id="service"
            name="service"
            value={form.country}
            onChange={handleChange}
          >
            <option value="">Pais</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>

          <label htmlFor="state">Provincia/Estado</label>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option value="">Provincia/Estado</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>

          <button type="submit" className={styles.submitButton}>
            Pagar con CardNet
          </button>
        </form>
      </div>
      <FooterContact />
    </div>
  );
}
