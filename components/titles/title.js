// components/HighlightedTitle.js
import React from 'react';
import styles from "@/styles/title.module.css";
import SliceAnimation from '../animations/sliceAnimations/slide';

const Title = ({ title }) => {
  return (
    <SliceAnimation>
    <div className={styles.titleContainer}>
      <h1 className={styles.highlightedText}>{title}</h1>
    </div>
    </SliceAnimation>
  );
};

export default Title;
