import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Auth.css';

function Profile() {
    const [user, setUser] = useState(null);
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
                        return response.json();
                    }
                    throw new Error('Not authenticated');
                })
                .then(data => setUser(data))
                .catch(() => setUser(null));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) {
        return (
            <div className="auth-container">
                <h2 style={{fontSize: "2rem"}}>Добро пожаловать!</h2>
                <p style={{fontSize: "1.3rem"}}>Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы получить
                    доступ к профилю и тренировочному блоку.</p>
                <div>
                    <Link to="/login">
                        <button className="auth-button">Вход</button>
                    </Link>
                    <Link to="/register">
                        <button className="auth-button">Регистрация</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h2 style={{fontSize: "2rem"}}>Профиль</h2>
            <p style={{fontSize: "1.3rem"}}>Имя: {user.first_name}</p>
            <p style={{fontSize: "1.3rem"}}>Фамилия: {user.last_name}</p>
            <p style={{fontSize: "1.3rem"}}>Email: {user.email}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default Profile;
