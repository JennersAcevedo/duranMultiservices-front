'use client'
import axios from 'axios';
import Image from "next/image";
import styles from "@/styles/services.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../../assets/banner.webp";
import Title from "@/components/titles/title";
import Footer from "@/components/footer/footer";
import document from "../../assets/document.webp";
import { useEffect, useState } from "react";
import GuessNavBar from '@/components/GuessNavbar/guessNavBar';
import { useRouter } from 'next/navigation';

export default function DownloadPage() {
  const downloadDocument = async () => {
    try {
      const response = await axios.get('http://localhost:4000/documents/download', {
        responseType: 'blob', 
      });

      // Crear una URL para el archivo y disparar la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample.pdf'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault(); 
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
        <Title title="Descargas" />
        <div>
      <h1>Descargar documentos</h1>
      <button onClick={downloadDocument}>Descargar</button>
    </div>
      </main>
      <Footer />
    </div>
  );
}
