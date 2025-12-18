import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">🍳 Кулинарная Книга</h3>
            <p className="footer-description">
              Ваше личное пространство для создания, хранения и обмена кулинарными шедеврами
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📹</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Навигация</h4>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/recipes">Все рецепты</Link></li>
              <li><Link to="/categories">Категории</Link></li>
              <li><Link to="/favorites">Избранное</Link></li>
              <li><Link to="/add-recipe">Добавить рецепт</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Полезное</h4>
            <ul className="footer-links">
              <li><Link to="/about">О проекте</Link></li>
              <li><Link to="/help">Помощь</Link></li>
              <li><Link to="/privacy">Конфиденциальность</Link></li>
              <li><Link to="/terms">Условия использования</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Подписаться</h4>
            <p className="footer-subscribe-text">
              Получайте новые рецепты и кулинарные советы
            </p>
            <form className="subscribe-form">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="subscribe-input"
              />
              <button type="submit" className="btn btn-primary btn-small">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Кулинарная Книга. Все права защищены.
          </p>
          <p className="footer-note">
            Курсовой проект по веб-разработке
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;