'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/navbar.module.css";
import logo from "../../assets/logo.webp"
import EnterAnimation from '../animations/enterAnimations/enter';

export default function AdminNavbar ()  {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className={styles.navbar}>
      <EnterAnimation>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={70} height={70} />
      </div>
      </EnterAnimation>
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navItems} ${isOpen ? styles.active : ''}`}>
        <EnterAnimation>
        <li className={styles.navItem}>
          <Link href="/">Inicio</Link>
        </li>
        </EnterAnimation>

        <EnterAnimation>
        <li className={styles.navItem}>
          <Link href="/services">Servicios</Link>
        </li>
        </EnterAnimation>
        {/* <li className={styles.navItem}>
          <Link href="/clients">Clientes</Link>
        </li> */}
        <EnterAnimation>
        <li className={styles.navItem}>
          <Link href="/contact">Contáctanos</Link>
        </li>
        </EnterAnimation>
        <EnterAnimation>
        <li className={styles.appointment}>
          <Link href="/admin/appointments">Citas</Link>
        </li>
        </EnterAnimation>
        <EnterAnimation>
        <li className={styles.navItem}>
          <Link href="/login">Login</Link>
        </li>
        </EnterAnimation>
      </ul>
    </nav>
  );
};