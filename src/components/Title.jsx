import React from 'react';
import styles from './Title.module.css'; // If using CSS modules, otherwise remove this import

const Title = ({ text }) => {
  return (
    <h1 className={styles.title}>
      {text}
    </h1>
  );
};

export default Title;
