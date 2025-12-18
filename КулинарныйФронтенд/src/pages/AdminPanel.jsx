import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import '../styles.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Данные для админ-панели
  const [stats, setStats] = useState({
    totalRecipes: 156,
    totalUsers: 42,
    newRecipesToday: 8,
    pendingReviews: 3,
    categories: 12,
    tags: 45
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Иван Петров', email: 'ivan@test.com', role: 'user', joinDate: '2024-01-15', recipes: 12 },
    { id: 2, name: 'Мария Сидорова', email: 'maria@test.com', role: 'user', joinDate: '2024-02-20', recipes: 5 },
    { id: 3, name: 'Алексей Иванов', email: 'alex@test.com', role: 'admin', joinDate: '2024-01-10', recipes: 25 },
    { id: 4, name: 'Екатерина Смирнова', email: 'ekaterina@test.com', role: 'user', joinDate: '2024-03-05', recipes: 8 },
    { id: 5, name: 'Дмитрий Козлов', email: 'dmitry@test.com', role: 'user', joinDate: '2024-02-28', recipes: 3 }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Супы', count: 24, description: 'Первые блюда', status: 'active' },
    { id: 2, name: 'Салаты', count: 18, description: 'Холодные и теплые салаты', status: 'active' },
    { id: 3, name: 'Основные блюда', count: 45, description: 'Горячие вторые блюда', status: 'active' },
    { id: 4, name: 'Десерты', count: 32, description: 'Сладкие блюда', status: 'active' },
    { id: 5, name: 'Завтраки', count: 15, description: 'Рецепты для завтрака', status: 'pending' },
    { id: 6, name: 'Вегетарианские', count: 22, description: 'Без мяса', status: 'active' }
  ]);

  const [tags, setTags] = useState([
    { id: 1, name: 'быстро', count: 34, status: 'active' },
    { id: 2, name: 'полезно', count: 28, status: 'active' },
    { id: 3, name: 'дешево', count: 19, status: 'active' },
    { id: 4, name: 'праздничное', count: 22, status: 'active' },
    { id: 5, name: 'детское', count: 15, status: 'pending' },
    { id: 6, name: 'без глютена', count: 12, status: 'active' }
  ]);

  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Борщ украинский', author: 'Иван Петров', category: 'Супы', rating: 4.8, status: 'approved', date: '2024-01-15' },
    { id: 2, title: 'Тирамису', author: 'Мария Сидорова', category: 'Десерты', rating: 4.9, status: 'approved', date: '2024-02-20' },
    { id: 3, title: 'Новый салат', author: 'Алексей Иванов', category: 'Салаты', rating: 4.2, status: 'pending', date: '2024-03-10' },
    { id: 4, title: 'Экспериментальный суп', author: 'Дмитрий Козлов', category: 'Супы', rating: 3.8, status: 'rejected', date: '2024-03-05' },
    { id: 5, title: 'Домашний хлеб', author: 'Екатерина Смирнова', category: 'Выпечка', rating: 4.5, status: 'approved', date: '2024-02-28' }
  ]);

  useEffect(() => {
    // Проверяем права администратора
    if (!user || !isAdmin()) {
      navigate('/');
      return;
    }
    setLoading(false);
  }, [user, isAdmin, navigate]);

  const handleUserRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleCategoryStatusChange = (categoryId, newStatus) => {
    setCategories(categories.map(category =>
      category.id === categoryId ? { ...category, status: newStatus } : category
    ));
  };

  const handleTagStatusChange = (tagId, newStatus) => {
    setTags(tags.map(tag =>
      tag.id === tagId ? { ...tag, status: newStatus } : tag
    ));
  };

  const handleRecipeStatusChange = (recipeId, newStatus) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, status: newStatus } : recipe
    ));
  };

  const addCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      name: `Новая категория ${categories.length + 1}`,
      count: 0,
      description: '',
      status: 'pending'
    };
    setCategories([...categories, newCategory]);
  };

  const addTag = () => {
    const newTag = {
      id: tags.length + 1,
      name: `новый-тег-${tags.length + 1}`,
      count: 0,
      status: 'pending'
    };
    setTags([...tags, newTag]);
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const deleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p style={{ marginTop: '20px' }}>Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container" style={{ padding: '40px 0' }}>
        {/* Заголовок */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '40px'
        }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>👑 Панель администратора</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Управление пользователями, рецептами, категориями и тегами
          </p>
        </div>

        {/* Статистика */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ textAlign: 'left' }}>Общая статистика</h2>
          <div className="recipes-grid">
            {[
              { label: 'Всего рецептов', value: stats.totalRecipes, icon: '📝', color: '#E27D60' },
              { label: 'Пользователей', value: stats.totalUsers, icon: '👥', color: '#85BD9B' },
              { label: 'Новых сегодня', value: stats.newRecipesToday, icon: '🆕', color: '#E8A87C' },
              { label: 'На модерации', value: stats.pendingReviews, icon: '⏳', color: '#7E57C2' },
              { label: 'Категорий', value: stats.categories, icon: '🏷️', color: '#4CAF50' },
              { label: 'Тегов', value: stats.tags, icon: '#️⃣', color: '#FFA726' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  background: 'var(--bg-card)',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  border: `2px solid ${stat.color}20`
                }}
              >
                <div style={{ 
                  fontSize: '40px', 
                  marginBottom: '15px',
                  color: stat.color
                }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold',
                  color: 'var(--text-dark)',
                  marginBottom: '5px'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  color: 'var(--text-light)', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Навигация по разделам */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'dashboard', label: '📊 Дашборд' },
            { id: 'users', label: '👥 Пользователи' },
            { id: 'recipes', label: '📝 Рецепты' },
            { id: 'categories', label: '🏷️ Категории' },
            { id: 'tags', label: '#️⃣ Теги' },
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
          {/* Вкладка пользователей */}
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--text-dark)', fontSize: '24px' }}>Управление пользователями</h2>
                <button className="btn btn-primary">
                  👤 Добавить пользователя
                </button>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>ID</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Имя</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Роль</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Дата регистрации</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Рецептов</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '15px' }}>#{user.id}</td>
                        <td style={{ padding: '15px', fontWeight: '500' }}>{user.name}</td>
                        <td style={{ padding: '15px' }}>{user.email}</td>
                        <td style={{ padding: '15px' }}>
                          <select
                            value={user.role}
                            onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid var(--border)',
                              background: 'var(--bg-body)',
                              color: 'var(--text-dark)'
                            }}
                          >
                            <option value="user">Пользователь</option>
                            <option value="admin">Администратор</option>
                            <option value="moderator">Модератор</option>
                          </select>
                        </td>
                        <td style={{ padding: '15px' }}>{user.joinDate}</td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>{user.recipes}</td>
                        <td style={{ padding: '15px' }}>
                          <button className="btn btn-outline" style={{ padding: '8px 12px', fontSize: '14px', marginRight: '10px' }}>
                            ✏️
                          </button>
                          <button className="btn btn-danger" style={{ padding: '8px 12px', fontSize: '14px' }}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Вкладка категорий */}
          {activeTab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--text-dark)', fontSize: '24px' }}>Управление категориями</h2>
                <button onClick={addCategory} className="btn btn-primary">
                  ➕ Добавить категорию
                </button>
              </div>
              
              <div className="recipes-grid">
                {categories.map(category => (
                  <div key={category.id} style={{
                    background: 'var(--bg-body)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: `2px solid ${category.status === 'active' ? '#85BD9B' : category.status === 'pending' ? '#E8A87C' : '#E27D60'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ color: 'var(--text-dark)', margin: 0 }}>{category.name}</h3>
                      <span style={{
                        background: category.status === 'active' ? '#85BD9B' : category.status === 'pending' ? '#E8A87C' : '#E27D60',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {category.status === 'active' ? 'Активна' : category.status === 'pending' ? 'На рассмотрении' : 'Отклонена'}
                      </span>
                    </div>
                    
                    <p style={{ color: 'var(--text-medium)', marginBottom: '15px', fontSize: '14px' }}>
                      {category.description || 'Описание отсутствует'}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                        📝 {category.count} рецептов
                      </span>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                          value={category.status}
                          onChange={(e) => handleCategoryStatusChange(category.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-card)',
                            fontSize: '12px'
                          }}
                        >
                          <option value="active">Активна</option>
                          <option value="pending">На рассмотрении</option>
                          <option value="rejected">Отклонена</option>
                        </select>
                        
                        <button
                          onClick={() => deleteCategory(category.id)}
                          style={{
                            background: '#FF6B6B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Вкладка тегов */}
          {activeTab === 'tags' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--text-dark)', fontSize: '24px' }}>Управление тегами</h2>
                <button onClick={addTag} className="btn btn-primary">
                  ➕ Добавить тег
                </button>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {tags.map(tag => (
                  <div key={tag.id} style={{
                    background: 'var(--bg-body)',
                    padding: '15px 20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    border: `2px solid ${tag.status === 'active' ? '#85BD9B' : '#E8A87C'}`
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '5px' }}>
                        #{tag.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        Используется в {tag.count} рецептах
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <select
                        value={tag.status}
                        onChange={(e) => handleTagStatusChange(tag.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-card)',
                          fontSize: '12px'
                        }}
                      >
                        <option value="active">Активен</option>
                        <option value="pending">На рассмотрении</option>
                      </select>
                      
                      <button
                        onClick={() => deleteTag(tag.id)}
                        style={{
                          background: '#FF6B6B',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Вкладка рецептов */}
          {activeTab === 'recipes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--text-dark)', fontSize: '24px' }}>Модерация рецептов</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline">
                    📥 Экспорт
                  </button>
                  <button className="btn btn-primary">
                    🔍 Расширенный поиск
                  </button>
                </div>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>ID</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Название</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Автор</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Категория</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Рейтинг</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Статус</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Дата</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-dark)' }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map(recipe => (
                      <tr key={recipe.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '15px' }}>#{recipe.id}</td>
                        <td style={{ padding: '15px', fontWeight: '500' }}>
                          <a href={`/recipe/${recipe.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                            {recipe.title}
                          </a>
                        </td>
                        <td style={{ padding: '15px' }}>{recipe.author}</td>
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
                        <td style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ color: '#FFD166' }}>★</span>
                            {recipe.rating}
                          </div>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <select
                            value={recipe.status}
                            onChange={(e) => handleRecipeStatusChange(recipe.id, e.target.value)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid var(--border)',
                              background: recipe.status === 'approved' ? '#E8F5E9' : 
                                       recipe.status === 'pending' ? '#FFF3E0' : '#FFEBEE',
                              color: recipe.status === 'approved' ? '#2E7D32' : 
                                     recipe.status === 'pending' ? '#F57C00' : '#D32F2F'
                            }}
                          >
                            <option value="approved">Одобрен</option>
                            <option value="pending">На модерации</option>
                            <option value="rejected">Отклонен</option>
                          </select>
                        </td>
                        <td style={{ padding: '15px' }}>{recipe.date}</td>
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
            </div>
          )}

          {/* Вкладка настроек */}
          {activeTab === 'settings' && (
            <div>
              <h2 style={{ color: 'var(--text-dark)', fontSize: '24px', marginBottom: '30px' }}>Настройки системы</h2>
              
              <div className="recipes-grid">
                {[
                  {
                    title: 'Общие настройки',
                    icon: '⚙️',
                    description: 'Основные параметры системы',
                    fields: [
                      { label: 'Название сайта', value: 'Кулинарная Книга' },
                      { label: 'Контактный email', value: 'admin@cookbook.com' },
                      { label: 'Режим сайта', value: 'Рабочий' }
                    ]
                  },
                  {
                    title: 'Модерация',
                    icon: '🛡️',
                    description: 'Настройки модерации контента',
                    fields: [
                      { label: 'Авто-модерация', value: 'Включена' },
                      { label: 'Макс. рецептов в день', value: '10' },
                      { label: 'Рейтинг для автоодобрения', value: '4.0' }
                    ]
                  },
                  {
                    title: 'Уведомления',
                    icon: '🔔',
                    description: 'Настройки уведомлений',
                    fields: [
                      { label: 'Email уведомления', value: 'Включены' },
                      { label: 'Новые рецепты', value: 'Включены' },
                      { label: 'Модерация', value: 'Включены' }
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} style={{
                    background: 'var(--bg-body)',
                    padding: '25px',
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                      <div style={{ fontSize: '32px' }}>{section.icon}</div>
                      <div>
                        <h3 style={{ color: 'var(--text-dark)', marginBottom: '5px' }}>{section.title}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>{section.description}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: '10px',
                          borderBottom: '1px solid var(--border)'
                        }}>
                          <span style={{ color: 'var(--text-medium)', fontSize: '14px' }}>{field.label}</span>
                          <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{field.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
                      Изменить настройки
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Вкладка дашборда */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ color: 'var(--text-dark)', fontSize: '24px', marginBottom: '30px' }}>Быстрые действия</h2>
              
              <div className="recipes-grid">
                {[
                  {
                    title: 'Добавить категорию',
                    icon: '🏷️',
                    color: '#85BD9B',
                    action: addCategory
                  },
                  {
                    title: 'Добавить тег',
                    icon: '#️⃣',
                    color: '#E8A87C',
                    action: addTag
                  },
                  {
                    title: 'Посмотреть логи',
                    icon: '📊',
                    color: '#7E57C2',
                    action: () => alert('Логи системы')
                  },
                  {
                    title: 'Резервная копия',
                    icon: '💾',
                    color: '#4CAF50',
                    action: () => alert('Создание резервной копии')
                  },
                  {
                    title: 'Очистить кэш',
                    icon: '🧹',
                    color: '#FFA726',
                    action: () => alert('Кэш очищен')
                  },
                  {
                    title: 'Справка',
                    icon: '❓',
                    color: '#E27D60',
                    action: () => alert('Документация')
                  }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    style={{
                      background: 'var(--bg-body)',
                      padding: '30px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '180px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ 
                      fontSize: '48px', 
                      marginBottom: '20px',
                      color: item.color
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ 
                      color: 'var(--text-dark)', 
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;