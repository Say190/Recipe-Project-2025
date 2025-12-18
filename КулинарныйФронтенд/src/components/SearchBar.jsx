import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ placeholder = "🔍 Поиск рецептов, ингредиентов, категорий..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Пример данных для поиска
  const searchData = {
    recipes: [
      { id: 1, title: "Борщ украинский", type: 'recipe', category: 'Супы' },
      { id: 2, title: "Салат Цезарь", type: 'recipe', category: 'Салаты' },
      { id: 3, title: "Яблочный пирог", type: 'recipe', category: 'Десерты' },
      { id: 4, title: "Спагетти Карбонара", type: 'recipe', category: 'Итальянская' },
      { id: 5, title: "Плов узбекский", type: 'recipe', category: 'Основные блюда' },
      { id: 6, title: "Тирамису", type: 'recipe', category: 'Десерты' },
    ],
    categories: [
      { id: 1, name: "Супы", type: 'category' },
      { id: 2, name: "Салаты", type: 'category' },
      { id: 3, name: "Десерты", type: 'category' },
      { id: 4, name: "Итальянская кухня", type: 'category' },
      { id: 5, name: "Основные блюда", type: 'category' },
      { id: 6, name: "Завтраки", type: 'category' },
    ],
    ingredients: [
      { id: 1, name: "Курица", type: 'ingredient' },
      { id: 2, name: "Картофель", type: 'ingredient' },
      { id: 3, name: "Морковь", type: 'ingredient' },
      { id: 4, name: "Лук", type: 'ingredient' },
      { id: 5, name: "Помидоры", type: 'ingredient' },
      { id: 6, name: "Сыр", type: 'ingredient' },
      { id: 7, name: "Яйца", type: 'ingredient' },
      { id: 8, name: "Мука", type: 'ingredient' },
      { id: 9, name: "Сахар", type: 'ingredient' },
      { id: 10, name: "Сметана", type: 'ingredient' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const searchLower = query.toLowerCase();
    const results = [];

    // Поиск по рецептам
    searchData.recipes.forEach(recipe => {
      if (recipe.title.toLowerCase().includes(searchLower)) {
        results.push({ ...recipe, icon: '📝' });
      }
    });

    // Поиск по категориям
    searchData.categories.forEach(category => {
      if (category.name.toLowerCase().includes(searchLower)) {
        results.push({ ...category, icon: '🏷️' });
      }
    });

    // Поиск по ингредиентам
    searchData.ingredients.forEach(ingredient => {
      if (ingredient.name.toLowerCase().includes(searchLower)) {
        results.push({ ...ingredient, icon: '🥕' });
      }
    });

    setSuggestions(results.slice(0, 8));
    setShowSuggestions(results.length > 0);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'recipe') {
      navigate(`/recipe/${suggestion.id}`);
    } else if (suggestion.type === 'category') {
      navigate('/');
      setTimeout(() => {
        const event = new CustomEvent('filterByCategory', { detail: suggestion.name });
        window.dispatchEvent(event);
      }, 100);
    } else if (suggestion.type === 'ingredient') {
      navigate(`/search?ingredient=${encodeURIComponent(suggestion.name)}`);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'recipe': return 'Рецепт';
      case 'category': return 'Категория';
      case 'ingredient': return 'Ингредиент';
      default: return '';
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
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
        <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>
          🔍
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          zIndex: 1000,
          marginTop: '10px',
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }}>
          <div style={{ padding: '10px 15px', background: 'var(--bg-body)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>
              Найдено {suggestions.length} результатов
            </span>
          </div>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {suggestions.map((item, index) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSuggestionClick(item)}
                style={{
                  width: '100%',
                  padding: '15px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: index < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-body)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: '20px' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: 'var(--text-dark)', marginBottom: '5px' }}>
                    {item.title || item.name}
                  </div>
                  {item.category && (
                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                      {item.category}
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--primary)',
                  background: 'rgba(226, 125, 96, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {getTypeLabel(item.type)}
                </div>
              </button>
            ))}
          </div>
          
          <div style={{ padding: '15px', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={handleSearch}
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              🔍 Искать "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;