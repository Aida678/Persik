import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          localStorage.removeItem('token');
          setLoggedIn(false);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
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
            <li><Link to="/profile">Профиль</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
