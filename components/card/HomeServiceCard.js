import React from 'react';
import styles from "@/styles/HomeServiceCard.module.css";

const HomeServiceCard = ({ imageSrc, title, description }) => {
  return (
    <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default HomeServiceCard;