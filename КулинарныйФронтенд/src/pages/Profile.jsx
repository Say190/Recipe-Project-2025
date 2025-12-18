import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import '../styles.css';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const userStats = {
    recipesCreated: 12,
    favorites: 8,
    reviews: 5,
    joinedDate: '2024-01-15'
  };

  const userRecipes = [
    { id: 1, title: 'Борщ украинский', category: 'Супы', date: '2024-01-20', status: 'published' },
    { id: 2, title: 'Салат Цезарь', category: 'Салаты', date: '2024-02-15', status: 'published' },
    { id: 3, title: 'Яблочный пирог', category: 'Десерты', date: '2024-03-10', status: 'draft' },
    { id: 4, title: 'Курица с овощами', category: 'Основные блюда', date: '2024-03-05', status: 'published' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container" style={{ padding: '40px 0' }}>
        {/* Заголовок профиля */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              border: '4px solid white'
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>{user.name}</h1>
              <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '15px' }}>{user.email}</p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '25px' }}>
                  <span style={{ fontWeight: '600' }}>👑 {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '25px' }}>
                  <span>📅 Присоединился: {userStats.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              background: 'white',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 24px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isEditing ? '✕ Отмена' : '✏️ Редактировать профиль'}
          </button>
        </div>

        {/* Статистика */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ textAlign: 'left' }}>Моя активность</h2>
          <div className="recipes-grid">
            {[
              { label: 'Созданных рецептов', value: userStats.recipesCreated, icon: '📝', color: '#E27D60' },
              { label: 'В избранном', value: userStats.favorites, icon: '❤️', color: '#85BD9B' },
              { label: 'Отзывов', value: userStats.reviews, icon: '⭐', color: '#E8A87C' },
              { label: 'Дней с нами', value: Math.floor((Date.now() - new Date(userStats.joinedDate).getTime()) / (1000 * 60 * 60 * 24)), icon: '📅', color: '#7E57C2' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'var(--bg-card)',
                padding: '25px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                border: `2px solid ${stat.color}20`
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px', color: stat.color }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '5px' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Навигация по вкладкам */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'profile', label: '👤 Профиль' },
            { id: 'recipes', label: '📝 Мои рецепты' },
            { id: 'favorites', label: '❤️ Избранное' },
            { id: 'settings', label: '⚙️ Настройки' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'white' : 'var(--text-medium)',
                border: `1px solid ${activeTab === tab.id ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? '600' : '500',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Содержимое вкладок */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          {/* Вкладка профиля */}
          {activeTab === 'profile' && (
            <div>
              {isEditing ? (
                <div>
                  <h3 style={{ color: 'var(--text-dark)', marginBottom: '25px' }}>Редактирование профиля</h3>
                  
                  <div className="recipe-form-grid" style={{ marginBottom: '30px' }}>
                    <div className="form-group">
                      <label className="form-label">Имя</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Ваше имя"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Ваш email"
                      />
                    </div>
                    
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">О себе</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Расскажите о себе..."
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">URL аватара</label>
                      <input
                        type="url"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-outline"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="btn btn-primary"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', marginBottom: '30px' }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: 'var(--primary)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      fontWeight: 'bold'
                    }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>Информация о профиле</h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>Имя</div>
                          <div style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: '500' }}>{user.name}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>Email</div>
                          <div style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: '500' }}>{user.email}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>Роль</div>
                          <div style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: '500' }}>
                            <span style={{
                              background: user.role === 'admin' ? 'var(--secondary)' : 'var(--primary-light)',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '15px',
                              fontSize: '14px'
                            }}>
                              {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>ID пользователя</div>
                          <div style={{ fontSize: '16px', color: 'var(--text-dark)', fontWeight: '500' }}>#{user.id}</div>
                        </div>
                      </div>
                      
                      {user.bio && (
                        <div style={{ marginTop: '20px' }}>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>О себе</div>
                          <p style={{ color: 'var(--text-medium)', lineHeight: '1.6' }}>{user.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Вкладка моих рецептов */}
          {activeTab === 'recipes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--text-dark)', fontSize: '24px', margin: 0 }}>Мои рецепты</h3>
                <button
                  onClick={() => navigate('/add-recipe')}
                  className="btn btn-primary"
                >
                  ➕ Добавить рецепт
                </button>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Название</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Категория</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Дата</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Статус</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRecipes.map(recipe => (
                      <tr key={recipe.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '15px', fontWeight: '500' }}>
                          <a href={`/recipe/${recipe.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                            {recipe.title}
                          </a>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            background: 'var(--secondary)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px'
                          }}>
                            {recipe.category}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>{recipe.date}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            background: recipe.status === 'published' ? '#85BD9B' : '#E8A87C',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {recipe.status === 'published' ? 'Опубликован' : 'Черновик'}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-outline" style={{ padding: '8px', fontSize: '14px' }}>
                              👁️
                            </button>
                            <button className="btn btn-outline" style={{ padding: '8px', fontSize: '14px' }}>
                              ✏️
                            </button>
                            <button className="btn btn-danger" style={{ padding: '8px', fontSize: '14px' }}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button className="btn btn-outline">
                  📄 Показать все рецепты
                </button>
              </div>
            </div>
          )}

          {/* Вкладка настроек */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ color: 'var(--text-dark)', marginBottom: '30px' }}>Настройки аккаунта</h3>
              
              <div className="recipes-grid">
                <div style={{
                  background: 'var(--bg-body)',
                  padding: '25px',
                  borderRadius: '12px',
                  gridColumn: 'span 2'
                }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px' }}>Безопасность</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Текущий пароль</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Новый пароль</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Подтвердите пароль</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                      </div>
                    </div>
                    
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                      🔒 Изменить пароль
                    </button>
                  </div>
                </div>
                
                <div style={{
                  background: 'var(--bg-body)',
                  padding: '25px',
                  borderRadius: '12px',
                  gridColumn: 'span 2'
                }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px' }}>Уведомления</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-medium)' }}>📧 Email уведомления</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-medium)' }}>🔔 Новые рецепты</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-medium)' }}>💬 Комментарии к моим рецептам</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-medium)' }}>⭐ Новые отзывы</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                  
                  <button className="btn btn-primary" style={{ marginTop: '20px' }}>
                    💾 Сохранить настройки
                  </button>
                </div>
                
                <div style={{
                  background: 'var(--bg-body)',
                  padding: '25px',
                  borderRadius: '12px',
                  gridColumn: 'span 4'
                }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px' }}>Опасная зона</h4>
                  
                  <div>
                    <p style={{ color: 'var(--text-medium)', marginBottom: '15px' }}>
                      Удаление аккаунта — это необратимое действие. Все ваши данные будут удалены.
                    </p>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
                          logout();
                          navigate('/');
                        }
                      }}
                      style={{
                        background: '#D32F2F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      🗑️ Удалить аккаунт
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;