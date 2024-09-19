import React from 'react';
import styles from './generation.module.css';

const Generation: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Generation Page</h1>
      </div>
      <div>
        <a className={styles.link} href="https://drive.google.com/file/d/1zpEfdJU0_XyvjZH2HKQYzIDXilCKlWVm/view?usp=sharing" target='_blank' rel='noopener noreferrer'>
          Click here for backend demo
        </a>
      </div>
      <img src='/backend-demo.png' alt="backend-demo-img" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default Generation;
