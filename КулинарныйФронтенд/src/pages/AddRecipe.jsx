import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import '../styles.css';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: 4,
    difficulty: 'medium',
    category: '',
    tags: [],
    ingredients: [{ name: '', quantity: '' }],
    steps: [''],
    image: ''
  });

  const categories = ['Супы', 'Салаты', 'Основные блюда', 'Десерты', 'Завтраки', 'Выпечка'];
  const difficulties = [
    { value: 'easy', label: 'Легкая' },
    { value: 'medium', label: 'Средняя' },
    { value: 'hard', label: 'Сложная' }
  ];

  const handleInputChange = (field, value) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }]
    }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    setRecipe(prev => ({ ...prev, steps: updatedSteps }));
  };

  const addStep = () => {
    setRecipe(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index) => {
    const updatedSteps = recipe.steps.filter((_, i) => i !== index);
    setRecipe(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Рецепт сохранен:', recipe);
    alert('Рецепт успешно сохранен!');
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      <Header />
      
      <div className="container">
        <div className="recipe-form-container">
          <h2 className="recipe-form-title">🍽️ Добавить новый рецепт</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Основная информация */}
            <div className="recipe-form-grid">
              <div className="form-group">
                <label className="form-label">Название рецепта *</label>
                <input
                  type="text"
                  value={recipe.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input"
                  placeholder="Например: Тирамису"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Категория *</label>
                <select
                  value={recipe.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Описание</label>
              <textarea
                value={recipe.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="form-input"
                placeholder="Краткое описание вашего рецепта..."
                rows="3"
              />
            </div>
            
            {/* Время и сложность */}
            <div className="recipe-form-grid">
              <div className="form-group">
                <label className="form-label">Время подготовки (мин)</label>
                <input
                  type="number"
                  value={recipe.prepTime}
                  onChange={(e) => handleInputChange('prepTime', e.target.value)}
                  className="form-input"
                  placeholder="30"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Время готовки (мин)</label>
                <input
                  type="number"
                  value={recipe.cookTime}
                  onChange={(e) => handleInputChange('cookTime', e.target.value)}
                  className="form-input"
                  placeholder="60"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Количество порций</label>
                <input
                  type="number"
                  value={recipe.servings}
                  onChange={(e) => handleInputChange('servings', parseInt(e.target.value))}
                  className="form-input"
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Сложность</label>
                <select
                  value={recipe.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="form-input"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Ингредиенты */}
            <div className="form-section">
              <h3 className="form-section-title">Ингредиенты</h3>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="form-input"
                    placeholder="Например: Мука"
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    className="form-input"
                    placeholder="200 г"
                  />
                  {recipe.ingredients.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() => removeIngredient(index)}
                      type="button"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addIngredient}
                type="button"
                style={{ marginTop: '10px' }}
              >
                + Добавить ингредиент
              </Button>
            </div>
            
            {/* Шаги приготовления */}
            <div className="form-section">
              <h3 className="form-section-title">Шаги приготовления</h3>
              {recipe.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <textarea
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    className="form-input"
                    placeholder={`Шаг ${index + 1}...`}
                    rows="3"
                    style={{ flex: 1 }}
                  />
                  {recipe.steps.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() => removeStep(index)}
                      type="button"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addStep}
                type="button"
                style={{ marginTop: '10px' }}
              >
                + Добавить шаг
              </Button>
            </div>
            
            {/* URL изображения */}
            <div className="form-group">
              <label className="form-label">URL изображения (опционально)</label>
              <input
                type="url"
                value={recipe.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            {/* Кнопки отправки */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '30px',
              justifyContent: 'center'
            }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="large"
              >
                🍳 Сохранить рецепт
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;