import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, есть ли данные пользователя в localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Для тестирования без бэкенда используем моковые данные
      // В реальном приложении здесь будет API вызов
      
      // Задержка для имитации сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let userRole = 'user';
      let userName = email.split('@')[0];
      
      // Тестовые пользователи
      if (email === 'admin@test.com' || email.includes('admin')) {
        userRole = 'admin';
        userName = 'Администратор';
      }
      
      const userData = {
        id: Date.now(),
        email: email,
        name: userName,
        role: userRole,
        avatar: null
      };

      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Ошибка входа. Попробуйте еще раз.' };
    }
  };

  const register = async (userData) => {
    try {
      // Для тестирования без бэкенда
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'user',
        avatar: null
      };

      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Ошибка регистрации. Попробуйте еще раз.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAdmin,
    isAuthenticated,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};