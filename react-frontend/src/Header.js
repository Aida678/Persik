import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Название проекта</h1>
        <nav className="nav">
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/training">Тренировочный блок</a></li>
            <li><a href="/test">Пробный экзамен</a></li>
            <li><a href="/profile">Профиль</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
