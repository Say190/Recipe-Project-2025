import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [authDropdown, setAuthDropdown] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAuthDropdown(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: "Супы", icon: "🍲" },
    { name: "Салаты", icon: "🥗" },
    { name: "Основные блюда", icon: "🍛" },
    { name: "Десерты", icon: "🍰" },
    { name: "Итальянская кухня", icon: "🍝" },
    { name: "Выпечка", icon: "🥐" },
    { name: "Завтраки", icon: "🍳" },
    { name: "Вегетарианские", icon: "🥦" }
  ];

  const handleCategoryClick = (category) => {
    navigate('/');
    setTimeout(() => {
      const event = new CustomEvent('filterByCategory', { detail: category });
      window.dispatchEvent(event);
      setCategoriesDropdown(false);
    }, 100);
  };

  const handleNavigation = (section) => {
    if (section === 'recipes') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'favorites') {
      navigate('/favorites');
    } else if (section === 'add') {
      navigate('/add-recipe');
    } else if (section === 'admin') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    logout();
    setAuthDropdown(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🍳 Кулинарная Книга
        </Link>
        
        <nav className="nav-links">
          {/* Рецепты */}
          <button 
            onClick={() => handleNavigation('recipes')}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          >
            Рецепты
          </button>
          
          {/* Категории с выпадающим меню */}
          <div className="auth-dropdown" ref={categoriesRef}>
            <button 
              className="nav-link"
              onClick={() => setCategoriesDropdown(!categoriesDropdown)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Категории
              <span style={{ 
                fontSize: '12px',
                transform: categoriesDropdown ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s'
              }}>
                ▼
              </span>
            </button>
            
            {categoriesDropdown && (
              <div className="dropdown-menu" style={{
                minWidth: '250px',
                padding: '15px',
                right: 0
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ 
                    color: 'var(--text-dark)', 
                    marginBottom: '10px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Все категории
                  </h4>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category.name)}
                      style={{
                        padding: '10px',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Избранное */}
          <button 
            onClick={() => handleNavigation('favorites')}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span style={{ color: '#E27D60' }}>❤️</span>
            Избранное
          </button>
           
          {/* Добавить рецепт */}
          <button 
            onClick={() => handleNavigation('add')}
            className="nav-link"
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '500'
            }}
          >
            <span>➕</span>
            Добавить рецепт
          </button>   
          
          {/* Админ панель (только для админов) */}
          {user?.role === 'admin' && (
            <button 
              onClick={() => handleNavigation('admin')}
              className="nav-link"
              style={{
                background: 'var(--secondary)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: '500'
              }}
            >
              <span>👑</span>
              Админ
            </button>
          )}
          
          {/* Кнопка авторизации */}
          <div className="auth-dropdown" ref={dropdownRef}>
            {user ? (
              <>
                <button 
                  className="auth-btn"
                  onClick={() => setAuthDropdown(!authDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-dark)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>
                    {user.role === 'admin' ? '👑' : '👤'}
                  </span>
                </button>
                
                {authDropdown && (
                  <div className="dropdown-menu" style={{
                    minWidth: '220px',
                    padding: '15px',
                    right: 0
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '15px',
                      paddingBottom: '15px',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                          {user.email}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          background: user.role === 'admin' ? 'var(--secondary)' : 'var(--primary-light)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          display: 'inline-block',
                          marginTop: '5px'
                        }}>
                          {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Link 
                        to="/profile" 
                        onClick={() => setAuthDropdown(false)}
                        style={{
                          padding: '10px 15px',
                          background: 'var(--bg-body)',
                          color: 'var(--text-dark)',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span>👤</span>
                        Мой профиль
                      </Link>
                      
                      <Link 
                        to="/my-recipes" 
                        onClick={() => setAuthDropdown(false)}
                        style={{
                          padding: '10px 15px',
                          background: 'var(--bg-body)',
                          color: 'var(--text-dark)',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span>📝</span>
                        Мои рецепты
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        style={{
                          padding: '10px 15px',
                          background: 'transparent',
                          color: '#D32F2F',
                          border: '1px solid #D32F2F',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        <span>🚪</span>
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <button 
                  className="auth-btn"
                  onClick={() => setAuthDropdown(!authDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-dark)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>👤</span>
                  <span>Войти</span>
                </button>
                
                {authDropdown && (
                  <div className="dropdown-menu" style={{
                    minWidth: '220px',
                    padding: '15px',
                    right: 0
                  }}>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ 
                        color: 'var(--text-dark)', 
                        marginBottom: '5px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        Войти или зарегистрироваться
                      </h4>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Link 
                        to="/login" 
                        onClick={() => setAuthDropdown(false)}
                        style={{
                          padding: '10px 15px',
                          background: 'var(--primary)',
                          color: 'white',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          textAlign: 'center',
                          fontWeight: '500',
                          transition: 'background 0.2s'
                        }}
                      >
                        Войти в аккаунт
                      </Link>
                      
                      <Link 
                        to="/register" 
                        onClick={() => setAuthDropdown(false)}
                        style={{
                          padding: '10px 15px',
                          background: 'transparent',
                          color: 'var(--primary)',
                          border: '1px solid var(--primary)',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          textAlign: 'center',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                      >
                        Создать аккаунт
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;