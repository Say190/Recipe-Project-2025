import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Простая валидация
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Неверный email или пароль');
    }
    
    setLoading(false);
  };

  const handleTestLogin = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container">
        <div style={{
          background: 'var(--bg-card)',
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '80px auto',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '30px' }}>
            Вход в аккаунт 🔐
          </h2>
          
          {error && (
            <div style={{
              background: '#FFE5E5',
              color: '#D32F2F',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@email.com"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Пароль</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>
            
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Link to="/forgot-password" style={{ 
                color: 'var(--primary)', 
                fontSize: '14px',
                textDecoration: 'none'
              }}>
                Забыли пароль?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Нет аккаунта?
            </p>
            <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>
              Зарегистрироваться
            </Link>
          </div>

          {/* Тестовые аккаунты */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            background: 'var(--bg-card)', 
            borderRadius: '10px',
            border: '1px solid var(--border)'
          }}>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--text-light)', 
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              Тестовые аккаунты (нажмите для автозаполнения):
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => handleTestLogin('user@test.com', '123456')}
                style={{
                  padding: '10px',
                  background: 'var(--bg-body)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
              >
                <div>👤 <strong>Пользователь:</strong> user@test.com</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Пароль: 123456</div>
              </button>
              <button 
                onClick={() => handleTestLogin('admin@test.com', '123456')}
                style={{
                  padding: '10px',
                  background: 'var(--bg-body)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
              >
                <div>👑 <strong>Администратор:</strong> admin@test.com</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Пароль: 123456</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;