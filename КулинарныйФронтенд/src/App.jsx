import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddRecipe from './pages/AddRecipe';
import FavoritesPage from './pages/FavoritesPage';
import { useState, useEffect } from 'react';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

// Главная страница
const Home = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Пустой массив вместо [1, 4, 6]
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Загружаем избранное из localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);
  
  // Слушаем события обновления избранного
  useEffect(() => {
    const handleFavoritesUpdated = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(updatedFavorites);
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  // Исходные данные рецептов
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
    {
      id: 2,
      title: "Салат Цезарь с курицей",
      description: "Хрустящий салат с соусом цезарь, пармезаном и гренками.",
      time: "25 мин",
      category: "Салаты",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600",
      rating: 4.5,
      difficulty: "Легкая",
      isNew: true,
      views: 890,
      ingredients: ["Куриная грудка", "Салат романо", "Пармезан", "Гренки"]
    },
    {
      id: 3,
      title: "Яблочный пирог",
      description: "Домашний пирог с яблоками и корицей. Идеально к чаю.",
      time: "1 час 15 мин",
      category: "Десерты",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600",
      rating: 4.9,
      difficulty: "Средняя",
      isNew: false,
      views: 2100,
      ingredients: ["Яблоки", "Мука", "Сахар", "Масло", "Корица"]
    },
    {
      id: 4,
      title: "Спагетти Карбонара",
      description: "Классический итальянский рецепт с беконом, яйцами и сыром пармезан.",
      time: "30 мин",
      category: "Итальянская",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600",
      rating: 4.7,
      difficulty: "Легкая",
      isNew: true,
      views: 1560,
      ingredients: ["Спагетти", "Бекон", "Яйца", "Пармезан", "Чеснок"]
    },
    {
      id: 5,
      title: "Плов узбекский",
      description: "Настоящий узбекский плов с бараниной, морковью и специями.",
      time: "2 часа 30 мин",
      category: "Основные блюда",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600",
      rating: 4.6,
      difficulty: "Сложная",
      isNew: false,
      views: 980,
      ingredients: ["Баранина", "Рис", "Морковь", "Лук", "Зира"]
    },
    {
      id: 6,
      title: "Тирамису",
      description: "Итальянский десерт с кофейной пропиткой, сыром маскарпоне и какао.",
      time: "4 часа",
      category: "Десерты",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600",
      rating: 4.9,
      difficulty: "Сложная",
      isNew: false,
      views: 1750,
      ingredients: ["Сыр маскарпоне", "Кофе", "Печенье савоярди", "Какао", "Яйца"]
    }
  ];

  const categories = [
    { name: "Все", icon: "🍽️", count: allRecipes.length },
    { name: "Супы", icon: "🍲", count: allRecipes.filter(r => r.category === "Супы").length },
    { name: "Салаты", icon: "🥗", count: allRecipes.filter(r => r.category === "Салаты").length },
    { name: "Десерты", icon: "🍰", count: allRecipes.filter(r => r.category === "Десерты").length },
    { name: "Итальянская", icon: "🍝", count: allRecipes.filter(r => r.category === "Итальянская").length },
    { name: "Основные блюда", icon: "🍛", count: allRecipes.filter(r => r.category === "Основные блюда").length }
  ];

  // Обработчик фильтрации по категориям из Header
  useEffect(() => {
    const handleCategoryFilter = (event) => {
      setSelectedCategory(event.detail);
      setActiveFilter('Все');
    };

    window.addEventListener('filterByCategory', handleCategoryFilter);
    return () => {
      window.removeEventListener('filterByCategory', handleCategoryFilter);
    };
  }, []);

  // Функция добавления/удаления из избранного
  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId) 
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Функция фильтрации рецептов
  const getFilteredRecipes = () => {
    let filtered = [...allRecipes];
    
    // Поиск по названию, описанию, ингредиентам
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        recipe.category.toLowerCase().includes(query)
      );
    }
    
    // Фильтр по категории
    if (selectedCategory && selectedCategory !== "Все") {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }
    
    // Фильтр по типу
    switch(activeFilter) {
      case 'Новые':
        filtered = filtered.filter(recipe => recipe.isNew);
        break;
      case 'Популярные':
        filtered = [...filtered].sort((a, b) => b.views - a.views);
        break;
      case 'Избранные':
        filtered = filtered.filter(recipe => favorites.includes(recipe.id));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Применяем фильтры
  useEffect(() => {
    setRecipes(getFilteredRecipes());
  }, [activeFilter, searchQuery, selectedCategory, favorites]);

  // Обработчик поиска
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик выбора категории
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  return (
    <>
      <Header />
      
      {/* Герой-секция */}
      <section className="hero">
        <div className="container">
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '48px',
              color: 'var(--text-dark)',
              marginBottom: '20px',
              fontWeight: '700'
            }}>
              Кулинарная Книга
            </h1>
            <p style={{
              fontSize: '20px',
              color: 'var(--text-medium)',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Создавайте, храните и делитесь своими кулинарными рецептами
            </p>
            
            {/* Поиск */}
            <div style={{ 
              position: 'relative',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="🔍 Поиск рецептов, ингредиентов, категорий..."
                style={{
                  padding: '15px 20px 15px 50px',
                  width: '100%',
                  border: '2px solid var(--border)',
                  borderRadius: '50px',
                  fontSize: '16px',
                  backgroundColor: 'var(--bg-card)',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section style={{ 
        padding: '60px 0', 
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <h2 className="section-title">Категории рецептов</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            {categories.map((category, index) => (
              <button 
                key={index}
                onClick={() => handleCategorySelect(category.name)}
                style={{
                  background: selectedCategory === category.name ? 'var(--primary)' : 'var(--bg-body)',
                  padding: '25px 20px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: `2px solid ${selectedCategory === category.name ? 'var(--primary)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '140px'
                }}
              >
                <div style={{ 
                  fontSize: '40px', 
                  marginBottom: '15px'
                }}>
                  {category.icon}
                </div>
                <h3 style={{ 
                  color: selectedCategory === category.name ? 'white' : 'var(--text-dark)', 
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                <div style={{ 
                  color: selectedCategory === category.name ? 'rgba(255,255,255,0.9)' : 'var(--text-light)', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {category.count} рецептов
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Рецепты */}
      <section className="recipes-section" id="recipes">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <h2 className="section-title" style={{ margin: 0 }}>Рецепты</h2>
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {['Все', 'Новые', 'Популярные', 'Избранные'].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '10px 20px',
                    background: activeFilter === filter ? 'var(--primary)' : 'transparent',
                    color: activeFilter === filter ? 'white' : 'var(--text-medium)',
                    border: `1px solid ${activeFilter === filter ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '25px',
                    fontWeight: activeFilter === filter ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {recipes.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              color: 'var(--text-light)'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ marginBottom: '10px' }}>Рецепты не найдены</h3>
              <p>Попробуйте изменить запрос поиска или выбрать другую категорию</p>
            </div>
          )}
          
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                time={recipe.time}
                category={recipe.category}
                image={recipe.image}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
                rating={recipe.rating}
                difficulty={recipe.difficulty}
              />
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            color: 'var(--text-light)',
            fontSize: '14px'
          }}>
            Найдено {recipes.length} из {allRecipes.length} рецептов
            {searchQuery && ` по запросу "${searchQuery}"`}
            {selectedCategory && selectedCategory !== "Все" && ` в категории "${selectedCategory}"`}
            {activeFilter !== 'Все' && ` (фильтр: ${activeFilter})`}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button 
              className="btn btn-primary" 
              style={{
                padding: '15px 40px',
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => window.location.href = '/add-recipe'}
            >
              <span>➕</span>
              Добавить свой рецепт
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

// 404 страница
const NotFoundPage = () => {
  return (
    <div style={{ 
      backgroundColor: 'var(--bg-body)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <div className="container" style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <div style={{ 
          fontSize: '120px',
          marginBottom: '30px',
          color: 'var(--primary-light)'
        }}>
          404
        </div>
        <h1 style={{ 
          fontSize: '36px',
          color: 'var(--text-dark)',
          marginBottom: '20px'
        }}>
          Страница не найдена
        </h1>
        <p style={{ 
          fontSize: '18px',
          color: 'var(--text-medium)',
          marginBottom: '40px',
          maxWidth: '500px'
        }}>
          Запрашиваемая страница не существует или была перемещена
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
          style={{ padding: '15px 40px', fontSize: '16px' }}
        >
          Вернуться на главную
        </button>
      </div>
      <Footer />
    </div>
  );
};

// Главный компонент
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ 
          backgroundColor: 'var(--bg-body)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/search" element={<SearchResults />} />
            
            <Route path="/add-recipe" element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            } />
            
            <Route path="/favorites" element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          <Routes>
            <Route path="/" element={<Footer />} />
            <Route path="/login" element={null} />
            <Route path="/register" element={null} />
            <Route path="/recipe/:id" element={null} />
            <Route path="/search" element={<Footer />} />
            <Route path="/add-recipe" element={<Footer />} />
            <Route path="/favorites" element={<Footer />} />
            <Route path="/profile" element={<Footer />} />
            <Route path="/admin" element={<Footer />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;