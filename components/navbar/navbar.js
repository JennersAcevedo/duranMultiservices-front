'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/navbar.module.css";
import logo from "../../assets/logo.webp"

export default function Navbar ()  {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={70} height={70} />
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navItems} ${isOpen ? styles.active : ''}`}>
        <li className={styles.navItem}>
          <Link href="/">Inicio</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/servicios">Servicios</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/clientes">Clientes</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contacto">Contáctanos</Link>
        </li>
        <li className={styles.appointment}>
          <Link href="/cita">Hacer una Cita</Link>
        </li>
      </ul>
    </nav>
  );
};