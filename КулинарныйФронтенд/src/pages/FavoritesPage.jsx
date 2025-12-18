import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import '../styles.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  // Полный список рецептов (должен совпадать с Home.jsx)
  const allRecipes = [
    {
      id: 1,
      title: "Борщ украинский",
      description: "Наваристый борщ с говядиной, свеклой и сметаной. Классический рецепт.",
      time: "2 часа",
      category: "Супы",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600",
      rating: 4.8,
      difficulty: "Средняя"
    },
    {
      id: 2,
      title: "Салат Цезарь с курицей",
      description: "Хрустящий салат с соусом цезарь, пармезаном и гренками.",
      time: "25 мин",
      category: "Салаты",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600",
      rating: 4.5,
      difficulty: "Легкая"
    },
    {
      id: 3,
      title: "Яблочный пирог",
      description: "Домашний пирог с яблоками и корицей. Идеально к чаю.",
      time: "1 час 15 мин",
      category: "Десерты",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600",
      rating: 4.9,
      difficulty: "Средняя"
    },
    {
      id: 4,
      title: "Спагетти Карбонара",
      description: "Классический итальянский рецепт с беконом, яйцами и сыром пармезан.",
      time: "30 мин",
      category: "Итальянская",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600",
      rating: 4.7,
      difficulty: "Легкая"
    },
    {
      id: 5,
      title: "Плов узбекский",
      description: "Настоящий узбекский плов с бараниной, морковью и специями.",
      time: "2 часа 30 мин",
      category: "Основные блюда",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600",
      rating: 4.6,
      difficulty: "Сложная"
    },
    {
      id: 6,
      title: "Тирамису",
      description: "Итальянский десерт с кофейной пропиткой, сыром маскарпоне и какао.",
      time: "4 часа",
      category: "Десерты",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600",
      rating: 4.9,
      difficulty: "Сложная"
    }
  ];
  
  // Загружаем избранные рецепты
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
      
      // Фильтруем избранные
      const favoriteRecipes = allRecipes.filter(recipe => 
        savedFavorites.includes(recipe.id)
      );
      
      setRecipes(favoriteRecipes);
    };
    
    loadFavorites();
    
    // Слушаем события обновления избранного
    window.addEventListener('favoritesUpdated', loadFavorites);
    
    return () => {
      window.removeEventListener('favoritesUpdated', loadFavorites);
    };
  }, []);
  
  // Функция для удаления из избранного
  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId) 
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
    
    // Обновляем список рецептов
    const favoriteRecipes = allRecipes.filter(recipe => 
      newFavorites.includes(recipe.id)
    );
    
    setRecipes(favoriteRecipes);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container">
        <div style={{ padding: '60px 0' }}>
          <h1 className="section-title">❤️ Избранные рецепты</h1>
          
          {recipes.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              color: 'var(--text-light)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>❤️</div>
              <h2 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Пока пусто</h2>
              <p style={{ fontSize: '18px', marginBottom: '30px' }}>
                Добавляйте рецепты в избранное, нажимая на сердечко в карточке
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="btn btn-primary"
                style={{ padding: '12px 30px' }}
              >
                🔍 Найти рецепты
              </button>
            </div>
          ) : (
            <>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div>
                  <p style={{ color: 'var(--text-medium)', fontSize: '18px' }}>
                    Ваши избранные рецепты
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => {
                      if (window.confirm('Очистить все избранное?')) {
                        localStorage.removeItem('favorites');
                        setFavorites([]);
                        setRecipes([]);
                        window.dispatchEvent(new Event('favoritesUpdated'));
                      }
                    }}
                    className="btn btn-outline"
                    disabled={recipes.length === 0}
                  >
                    🗑️ Очистить все
                  </button>
                </div>
              </div>
              
              <div className="recipes-grid">
                {recipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;