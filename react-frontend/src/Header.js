import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/logout');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Название проекта</h1>
        <nav className="nav">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/training">Тренировочный блок</Link></li>
            <li><Link to="/test1">Тест 1</Link></li>
            <li><Link to="/test2">Тест 2</Link></li>
            {document.cookie.includes('session=') ? (
              <>
                <li><Link to="/profile">Профиль</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Выйти</button></li>
              </>
            ) : (
              <>
                <li><Link to="/register">Регистрация</Link></li>
                <li><Link to="/login">Вход</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
