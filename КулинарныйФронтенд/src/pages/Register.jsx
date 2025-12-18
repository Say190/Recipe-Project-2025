import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ general: result.message || 'Ошибка регистрации' });
    }
    
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container">
        <div className="form-container">
          <h2 style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '30px' }}>
            Регистрация 🍽️
          </h2>
          
          {errors.general && (
            <div style={{
              background: '#FFE5E5',
              color: '#D32F2F',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Имя и фамилия</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && (
                <div style={{ color: '#D32F2F', fontSize: '12px', marginTop: '5px' }}>
                  {errors.name}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ваш@email.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <div style={{ color: '#D32F2F', fontSize: '12px', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Пароль</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-input ${errors.password ? 'error' : ''}`}
              />
              {errors.password && (
                <div style={{ color: '#D32F2F', fontSize: '12px', marginTop: '5px' }}>
                  {errors.password}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Повторите пароль</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              />
              {errors.confirmPassword && (
                <div style={{ color: '#D32F2F', fontSize: '12px', marginTop: '5px' }}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" required />
                <span style={{ fontSize: '14px', color: 'var(--text-medium)' }}>
                  Я согласен с <Link to="/terms" style={{ color: 'var(--primary)' }}>условиями использования</Link>
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--primary)' }}>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;