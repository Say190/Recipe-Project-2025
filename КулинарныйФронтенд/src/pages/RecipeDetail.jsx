import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Пример данных рецептов (в реальном приложении будет API запрос)
  const allRecipes = [
    {
      id: 1,
      title: "Борщ украинский",
      description: "Наваристый борщ с говядиной, свеклой и сметаной. Классический рецепт.",
      time: "2 часа",
      category: "Супы",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800",
      rating: 4.8,
      difficulty: "Средняя",
      servings: 6,
      prepTime: "30 мин",
      cookTime: "1.5 часа",
      author: "Иван Петров",
      date: "2024-01-15",
      ingredients: [
        { name: "Говядина", quantity: "500 г" },
        { name: "Свекла", quantity: "2 шт" },
        { name: "Картофель", quantity: "4 шт" },
        { name: "Капуста", quantity: "300 г" },
        { name: "Морковь", quantity: "1 шт" },
        { name: "Лук", quantity: "2 шт" },
        { name: "Томатная паста", quantity: "2 ст.л" },
        { name: "Сметана", quantity: "для подачи" },
        { name: "Зелень", quantity: "по вкусу" },
        { name: "Специи", quantity: "по вкусу" }
      ],
      steps: [
        "Говядину промыть, залить холодной водой и варить 1.5 часа, снимая пену.",
        "Свеклу, морковь и лук очистить и нарезать соломкой.",
        "Обжарить овощи на растительном масле, добавить томатную пасту.",
        "Картофель и капусту нарезать, добавить в бульон, варить 15 минут.",
        "Добавить обжаренные овощи в борщ, варить еще 10 минут.",
        "Подавать со сметаной и свежей зеленью."
      ],
      tips: "Борщ вкуснее на второй день, когда настоится.",
      nutrition: {
        calories: 250,
        protein: "15г",
        carbs: "20г",
        fat: "10г"
      }
    },
    // ... другие рецепты
  ];

  useEffect(() => {
    const foundRecipe = allRecipes.find(r => r.id === parseInt(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setIsFavorite(localStorage.getItem('favorites')?.includes(id) || false);
    } else {
      navigate('/404');
    }
    setIsLoading(false);
  }, [id, navigate]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== parseInt(id));
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(parseInt(id));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
          <p>Загрузка рецепта...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>😕</div>
          <h2>Рецепт не найден</h2>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container">
        <div style={{ padding: '40px 0' }}>
          {/* Кнопка назад */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-medium)',
              marginBottom: '30px',
              fontSize: '16px'
            }}
          >
            ← Назад
          </button>

          {/* Заголовок и основная информация */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={handleToggleFavorite}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: isFavorite ? '#E27D60' : '#BDBDBD',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                {isFavorite ? '♥' : '♡'}
              </button>
            </div>

            <div style={{ padding: '40px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div>
                  <h1 style={{
                    fontSize: '36px',
                    color: 'var(--text-dark)',
                    marginBottom: '10px'
                  }}>
                    {recipe.title}
                  </h1>
                  <p style={{
                    color: 'var(--text-medium)',
                    fontSize: '18px',
                    lineHeight: '1.6'
                  }}>
                    {recipe.description}
                  </p>
                </div>

                <div style={{
                  background: 'var(--bg-body)',
                  padding: '20px',
                  borderRadius: '15px',
                  minWidth: '250px'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>
                        ⏱️ Время
                      </div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                        {recipe.time}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>
                        👥 Порции
                      </div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                        {recipe.servings}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>
                        🎯 Сложность
                      </div>
                      <div style={{ 
                        fontWeight: '600', 
                        color: recipe.difficulty === 'Легкая' ? '#85BD9B' : 
                               recipe.difficulty === 'Средняя' ? '#E8A87C' : '#E27D60'
                      }}>
                        {recipe.difficulty}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>
                        ⭐ Рейтинг
                      </div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                        {recipe.rating}/5
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-light)',
                    textAlign: 'center'
                  }}>
                    📅 Добавлено: {recipe.date} | 👨‍🍳 Автор: {recipe.author}
                  </div>
                </div>
              </div>

              {/* Навигация по вкладкам */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                borderBottom: '2px solid var(--border)',
                paddingBottom: '10px'
              }}>
                {[
                  { id: 'ingredients', label: '🍽️ Ингредиенты' },
                  { id: 'steps', label: '👨‍🍳 Приготовление' },
                  { id: 'nutrition', label: '📊 Пищевая ценность' },
                  { id: 'tips', label: '💡 Советы' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '10px 20px',
                      background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : 'var(--text-medium)',
                      border: 'none',
                      borderRadius: '8px',
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
              <div style={{ minHeight: '300px' }}>
                {activeTab === 'ingredients' && (
                  <div>
                    <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
                      Ингредиенты на {recipe.servings} порций
                    </h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                      gap: '15px' 
                    }}>
                      {recipe.ingredients.map((ing, index) => (
                        <div
                          key={index}
                          style={{
                            background: 'var(--bg-body)',
                            padding: '15px',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ color: 'var(--text-dark)' }}>{ing.name}</span>
                          <span style={{ 
                            color: 'var(--primary)', 
                            fontWeight: '600' 
                          }}>
                            {ing.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'steps' && (
                  <div>
                    <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
                      Шаги приготовления
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {recipe.steps.map((step, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            gap: '20px',
                            background: 'var(--bg-body)',
                            padding: '20px',
                            borderRadius: '12px'
                          }}
                        >
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
                            flexShrink: 0,
                            fontSize: '18px'
                          }}>
                            {index + 1}
                          </div>
                          <p style={{ 
                            color: 'var(--text-medium)', 
                            lineHeight: '1.6',
                            margin: 0,
                            fontSize: '16px'
                          }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

               {activeTab === 'nutrition' && recipe.nutrition && (
  <div>
    <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
      Пищевая ценность на порцию
    </h3>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px' 
    }}>
      <div style={{ textAlign: 'center', background: 'var(--bg-body)', padding: '25px', borderRadius: '12px' }}>
        <div style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '10px' }}>🔥</div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Калории</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
          {recipe.nutrition.calories} ккал
        </div>
      </div>
      <div style={{ textAlign: 'center', background: 'var(--bg-body)', padding: '25px', borderRadius: '12px' }}>
        <div style={{ fontSize: '32px', color: '#85BD9B', marginBottom: '10px' }}>🥩</div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Белки</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
          {recipe.nutrition.protein}
        </div>
      </div>
      <div style={{ textAlign: 'center', background: 'var(--bg-body)', padding: '25px', borderRadius: '12px' }}>
        <div style={{ fontSize: '32px', color: '#E8A87C', marginBottom: '10px' }}>🍞</div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Углеводы</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
          {recipe.nutrition.carbs}
        </div>
      </div>
      <div style={{ textAlign: 'center', background: 'var(--bg-body)', padding: '25px', borderRadius: '12px' }}>
        <div style={{ fontSize: '32px', color: '#E27D60', marginBottom: '10px' }}>🥑</div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Жиры</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
          {recipe.nutrition.fat}
        </div>
      </div>
    </div>
  </div>
)}

                {activeTab === 'tips' && recipe.tips && (
                  <div style={{
                    background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
                    padding: '30px',
                    borderRadius: '15px',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ fontSize: '32px' }}>💡</div>
                      <h3 style={{ margin: 0, color: 'white' }}>Полезный совет</h3>
                    </div>
                    <p style={{ fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
                      {recipe.tips}
                    </p>
                  </div>
                )}
              </div>

              {/* Кнопки действий */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid var(--border)'
              }}>
                <button className="btn btn-primary">
                  🖨️ Распечатать рецепт
                </button>
                <button className="btn btn-outline">
                  📱 Поделиться
                </button>
                <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-outline">
                  ✏️ Редактировать
                </Link>
              </div>
            </div>
          </div>

          {/* Похожие рецепты */}
          <div style={{ marginTop: '60px' }}>
            <h2 className="section-title">Похожие рецепты</h2>
            <div className="recipes-grid">
              {allRecipes
                .filter(r => r.category === recipe.category && r.id !== recipe.id)
                .slice(0, 3)
                .map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    <div className="recipe-content">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      <div className="recipe-meta">
                        <div className="recipe-time">⏱️ {recipe.time}</div>
                        <span className="recipe-category">{recipe.category}</span>
                      </div>
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        className="btn btn-outline"
                        style={{ marginTop: '15px', textAlign: 'center' }}
                      >
                        Смотреть рецепт
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;