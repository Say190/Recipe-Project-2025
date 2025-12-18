import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import '../styles.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Пример данных
  const allRecipes = [
    {
      id: 1,
      title: "Борщ украинский",
      description: "Наваристый борщ с говядиной, свеклой и сметаной. Классический рецепт.",
      time: "2 часа",
      category: "Супы",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600",
      rating: 4.8,
      difficulty: "Средняя",
      isNew: false,
      views: 1250,
      ingredients: ["Говядина", "Свекла", "Картофель", "Капуста", "Сметана"]
    },
    // ... другие рецепты (такие же как в Home.jsx)
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const ingredient = params.get('ingredient') || '';
    
    setSearchQuery(query || ingredient);
    performSearch(query, ingredient);
  }, [location]);

  const performSearch = (query, ingredient) => {
    setLoading(true);
    
    setTimeout(() => {
      let results = [...allRecipes];
      
      if (query) {
        const queryLower = query.toLowerCase();
        results = results.filter(recipe =>
          recipe.title.toLowerCase().includes(queryLower) ||
          recipe.description.toLowerCase().includes(queryLower) ||
          recipe.category.toLowerCase().includes(queryLower) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(queryLower))
        );
      }
      
      if (ingredient) {
        const ingredientLower = ingredient.toLowerCase();
        results = results.filter(recipe =>
          recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredientLower))
        );
      }
      
      setSearchResults(results);
      setLoading(false);
    }, 300);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    let sortedResults = [...searchResults];
    
    switch(filter) {
      case 'rating':
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'time':
        sortedResults.sort((a, b) => {
          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeA - timeB;
        });
        break;
      case 'difficulty':
        const difficultyOrder = { 'Легкая': 1, 'Средняя': 2, 'Сложная': 3 };
        sortedResults.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'new':
        sortedResults = sortedResults.filter(recipe => recipe.isNew);
        break;
      default:
        break;
    }
    
    setSearchResults(sortedResults);
  };

  const parseTime = (timeString) => {
    if (!timeString) return 0;
    
    const hoursMatch = timeString.match(/(\d+)\s*час/);
    const minutesMatch = timeString.match(/(\d+)\s*мин/);
    
    let totalMinutes = 0;
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1]);
    
    return totalMinutes;
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container" style={{ padding: '40px 0' }}>
        {/* Заголовок поиска */}
        <div style={{ 
          background: 'var(--bg-card)',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '36px', color: 'var(--text-dark)', marginBottom: '20px' }}>
            🔍 Результаты поиска
          </h1>
          
          <div style={{ fontSize: '20px', color: 'var(--text-medium)', marginBottom: '30px' }}>
            {searchQuery ? (
              <>
                По запросу: <span style={{ color: 'var(--primary)', fontWeight: '600' }}>"{searchQuery}"</span>
              </>
            ) : (
              'Введите запрос для поиска'
            )}
          </div>
          
          {/* Фильтры сортировки */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {[
              { id: 'all', label: 'Все' },
              { id: 'rating', label: 'По рейтингу' },
              { id: 'time', label: 'По времени' },
              { id: 'difficulty', label: 'По сложности' },
              { id: 'new', label: 'Новые' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                style={{
                  padding: '10px 20px',
                  background: activeFilter === filter.id ? 'var(--primary)' : 'transparent',
                  color: activeFilter === filter.id ? 'white' : 'var(--text-medium)',
                  border: `1px solid ${activeFilter === filter.id ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '25px',
                  fontWeight: activeFilter === filter.id ? '600' : '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
            Найдено: {searchResults.length} рецептов
          </div>
        </div>

        {/* Результаты поиска */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ 
              border: '3px solid #f3f3f3',
              borderTop: '3px solid var(--primary)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: 'var(--text-medium)' }}>Ищем рецепты...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="recipes-grid">
              {searchResults.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  isFavorite={false}
                  onToggleFavorite={() => {}}
                />
              ))}
            </div>
            
            {/* Пагинация */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '10px',
              marginTop: '40px' 
            }}>
              <button className="btn btn-outline" style={{ padding: '10px 20px' }}>
                ← Назад
              </button>
              
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  style={{
                    padding: '10px 15px',
                    background: page === 1 ? 'var(--primary)' : 'transparent',
                    color: page === 1 ? 'white' : 'var(--text-medium)',
                    border: `1px solid ${page === 1 ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button className="btn btn-outline" style={{ padding: '10px 20px' }}>
                Далее →
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Ничего не найдено</h3>
            <p style={{ fontSize: '18px', maxWidth: '500px', margin: '0 auto 30px' }}>
              Попробуйте изменить запрос поиска или использовать другие ключевые слова
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={{ padding: '15px 30px' }}
            >
              Вернуться на главную
            </button>
          </div>
        )}

        {/* Популярные поисковые запросы */}
        {!searchQuery && (
          <div style={{ marginTop: '60px' }}>
            <h2 className="section-title">Популярные запросы</h2>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '15px',
              marginTop: '30px'
            }}>
              {['Курица', 'Десерты', 'Овощи', 'Быстро', 'Полезно', 'Праздничное', 'Итальянская', 'Супы'].map(tag => (
                <button
                  key={tag}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '25px',
                    color: 'var(--text-dark)',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.color = 'var(--text-dark)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;