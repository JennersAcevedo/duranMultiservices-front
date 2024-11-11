import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import banner from "../assets/banner.webp";
import Title from "@/components/titles/title";
import HomeServiceCard from "@/components/card/HomeServiceCard";
import Footer from "@/components/footer/footer";
import woman from "../assets/woman.webp";
import document from "../assets/document.webp";
import divorce from "../assets/divorce.webp";
import american from "../assets/american-flag.webp";
import Link from 'next/link';

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
          <Link href='/services/translation'>
          <HomeServiceCard
            imageSrc={woman}
            title="Preparacion de Impuestos"
            description="This is the descriptive text for card 1."
          />
          </Link>
          <HomeServiceCard
            imageSrc={document}
            title="Traduccion de documentos"
            description="Traducimos tus documentos al instante"
          />
          <HomeServiceCard
            imageSrc={divorce}
            title="Aplicacion de divorcio"
            description="Hacemos la aplicacion para divorcio"
          />
          <HomeServiceCard
            imageSrc={american}
            title="Solicitud de Ciudadania Americana"
            description="Te ayudamos a conseguir la tan anhelada ciudadania Americana"
          />
          <HomeServiceCard
            imageSrc={document}
            title="Asesoria Migratoria"
            description="Te asesoramos en tus procesos migratorios"
          />
          <HomeServiceCard
            imageSrc={document}
            title="Cartas Notarizadas"
            description="Notarizamos tus cartas"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
