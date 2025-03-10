"use client";
import styles from "@/styles/appointments.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar/adminNavbar";
import { useRouter } from "next/navigation";

export default function Appointments() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log("values: ", value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const router = useRouter();
  useEffect(() => {
    async function tokenValidation() {
      let token = getCookie("authToken");
      console.log(token);

      if (!token) {
        console.log("no hay token");
        router.push("/login");
      } else {
        console.log("hay token");
      }
    }
    tokenValidation();
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let token = getCookie("authToken");
      console.log(token);

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const datesResponse = await axios.get(
        "http://localhost:4000/admin/appointments",
        config
      );
      console.log(datesResponse);
      if (datesResponse.data.success) {
        setData(datesResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleApi = async (id) => {
    try {
      let token = getCookie("authToken");
      console.log(token);

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const updateResponse = await axios.get(
    `http://localhost:4000/admin/appointments/${id}`,
        config
      );
      await fetchData()
    } catch (error) {
      console.error("Error reaching the API");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Citas</h1>
        {loading && <p>Cargando...</p>}
        <div className={styles.cardGrid}>
          {data.map((item) => (
            <div className={styles.cardContainer}>
              <div key={item.id} className={styles.card}>
                <div className={styles.appointmentData}>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  {/* <p>Titulo: {item.title}</p> */}
                  <p>Dia: {item.date}</p>
                  <p>
                    Horario: {item.start_time} - {item.end_time}
                  </p>
                  <p>Duracion: {item.duration} minutos</p>
                  <p>Referencia: {item.reference}</p>
                  <p>Modalidad: {item.type}</p>
                </div>
                <div className={styles.customer}>
                  <p>Cliente: {item.customer.name}</p>
                  <p>Telefono: {item.customer.phone}</p>
                  <p>Email: {item.customer.email}</p>
                </div>
              </div>
          {item.status===1  ?(
                     <button
         onClick={() => handleApi(item.id)}
         className={styles.button}
       >
         Marcar como Solucionado
       </button> ) : (    <p>Solucionado</p>)
        

   }
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
