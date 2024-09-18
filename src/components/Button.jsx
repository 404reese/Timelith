import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children, className, type = 'button', href, text, loading = false, ...props }) => {
  const buttonContent = loading ? 'Loading...' : text || children;

  if (href) {
    // Render as a link
    return (
      <a
        href={href}
        className={`${styles.button} ${className}`}
        {...props}
      >
        {buttonContent}
      </a>
    );
  }

  // Render as a button
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      type={type}
      disabled={loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
