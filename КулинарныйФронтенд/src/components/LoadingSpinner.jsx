import React from 'react';
import '../styles.css';

const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const spinner = (
    <div className="loading-spinner-wrapper">
      <div className={`loading-spinner spinner-${size}`}></div>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;