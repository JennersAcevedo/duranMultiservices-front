import Image from 'next/image';
import styles from "@/styles/footer.module.css";
import logo from '../../assets/logo.webp'; // Ajusta la ruta según tu estructura de proyecto

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Logo en el lado izquierdo */}
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={200} height={200} />
      </div>

      {/* Formulario de contacto */}
      <div className={styles.contactForm}>
        <h2>Contacto</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" placeholder="Tu nombre" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" placeholder="Tu correo" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" placeholder="Escribe tu mensaje" />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>

      {/* Links útiles */}
      <div className={styles.usefulLinks}>
        <h2>Enlaces de ayuda</h2>
        <ul>
          <li><a href="#">Política de Privacidad</a></li>
          <li><a href="#">Términos de Servicio</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Soporte</a></li>
        </ul>
      </div>
    </footer>
  );
}
