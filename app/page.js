import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../assets/banner.webp";
import Title from "@/components/titles/title";
import HomeServiceCard from "@/components/card/HomeServiceCard";
import Footer from "@/components/footer/footer";

export default function Home() {
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
        <Title title="Nuestros servicios" />
        <div className={styles.services}>
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Preparacion de Impuestos"
            description="This is the descriptive text for card 1."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Traduccion de documentos"
            description="This is the descriptive text for card 2."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Aplicacion de divorcio"
            description="This is the descriptive text for card 3."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Solicitud de Ciudadania Americana"
            description="This is the descriptive text for card 4."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Asesoria Migratoria"
            description="This is the descriptive text for card 5."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Cartas Notarizadas"
            description="This is the descriptive text for card 6."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Card 7"
            description="This is the descriptive text for card 7."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Card 8"
            description="This is the descriptive text for card 8."
          />
          <HomeServiceCard
            imageSrc="https://via.placeholder.com/300x200"
            title="Card 9"
            description="This is the descriptive text for card 9."
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer/>
      </footer>
    </div>
  );
}
