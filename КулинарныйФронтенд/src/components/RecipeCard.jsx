import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const RecipeCard = ({ 
  id,
  title, 
  description, 
  time, 
  category, 
  image, 
  isFavorite,
  onToggleFavorite,
  rating = 4.5,
  difficulty = 'Средняя'
}) => {
  // Функция для отрисовки звезд рейтинга
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star">☆</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star" style={{ color: '#E0E0E0' }}>★</span>);
    }
    
    return stars;
  };

  // Цвет сложности
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Легкая': return '#85BD9B';
      case 'Средняя': return '#E8A87C';
      case 'Сложная': return '#E27D60';
      default: return '#8D6E63';
    }
  };

  // Обработчик клика по избранному
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
      <div className="recipe-card">
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <img src={image} alt={title} className="recipe-image" />
          <button 
            onClick={handleFavoriteClick}
            className="favorite-btn"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '20px',
              color: isFavorite ? '#E27D60' : '#BDBDBD',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        
        <div className="recipe-content">
          <h3 className="recipe-title">{title}</h3>
          
          <div className="recipe-rating">
            {renderStars(rating)}
            <span style={{ marginLeft: '8px', color: '#8D6E63', fontSize: '14px' }}>
              {rating}
            </span>
          </div>
          
          <p className="recipe-description">{description}</p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '15px'
          }}>
            <span style={{ 
              color: getDifficultyColor(), 
              fontWeight: '600',
              fontSize: '14px',
              background: 'rgba(0,0,0,0.05)',
              padding: '4px 12px',
              borderRadius: '15px'
            }}>
              {difficulty}
            </span>
          </div>
          
          <div className="recipe-meta">
            <div className="recipe-time">
              <span style={{ fontSize: '18px' }}>⏱️</span> {time}
            </div>
            <span className="recipe-category">
              {category === 'Итальянская' ? '🍝' : 
               category === 'Салаты' ? '🥗' : 
               category === 'Десерты' ? '🍰' : 
               category === 'Супы' ? '🍲' :
               category === 'Основные блюда' ? '🍛' : '🍽️'} {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;