import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Training.css';

function Training() {
  const [loggedIn, setLoggedIn] = useState(false);

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
          setLoggedIn(false);
        }
      });
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (!loggedIn) {
    return (
      <div className="training-container">
        <h2>Тренировочный блок</h2>
        <p>Этот блок доступен только после регистрации.</p>
        <p>Пожалуйста, войдите в систему или зарегистрируйтесь.</p>
        <div>
          <Link to="/login"><button className="auth-button">Вход</button></Link>
          <Link to="/register"><button className="auth-button">Регистрация</button></Link>
        </div>
      </div>
    );
  }

  return (
      <div className="training-container">
        <h2>Тренировочный блок</h2>
        <ul>
          <li><Link to="/test1">Тестовая часть 1</Link></li>
          <li><Link to="/test2">Тестовая часть 2</Link></li>
          <li><Link to="/writing">Письменная часть</Link></li>
          <li><Link to="/speaking">Разговорная часть</Link></li>
        </ul>
      </div>
  );
}

export default Training;
