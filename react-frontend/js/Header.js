import React from 'react';
import './Header.css'; // Создайте этот файл для стилей

function Header() {
    return (
        <header className="header">
            <h1 className="logo">Название проекта</h1>
            <nav className="nav">
                <ul>
                    <li><a href="/static">Главная</a></li>
                    <li><a href="/training">Тренировочный блок</a></li>
                    <li><a href="/test">Пробный экзамен</a></li>
                    <li><a href="/profile">Профиль</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
