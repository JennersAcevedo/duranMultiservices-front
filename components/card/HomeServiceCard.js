import React from 'react';
import styles from "@/styles/HomeServiceCard.module.css";
import Image from 'next/image';

const HomeServiceCard = ({ imageSrc, title, description }) => {
  return (
    <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
      <div className={styles.imageContainer}>
      <Image
            src={imageSrc}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className={styles.bannerImage}
          />
        <div className={styles.overlay}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default HomeServiceCard;