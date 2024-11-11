'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/navbar.module.css";
import logo from "../../assets/logo.webp"

export default function GuessNavBar ()  {
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
          <Link href="/services">Servicios</Link>
        </li>
        {/* <li className={styles.navItem}>
          <Link href="/clients">Clientes</Link>
        </li> */}
        <li className={styles.navItem}>
          <Link href="/contact">Contáctanos</Link>
        </li>
        <li className={styles.appointment}>
          <Link href="/appointment">Hacer una Cita</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login">registar</Link>
        </li>
      </ul>
    </nav>
  );
};