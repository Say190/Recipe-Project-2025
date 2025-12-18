import React from 'react';
import '../styles.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon = null
}) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    danger: 'btn-danger'
  };

  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  };

  return (
    <button
      type={type}
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;