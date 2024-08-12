import React, {useState} from 'react';
import './Auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, email})
        });

        const data = await response.json();

        if (response.ok) {
            alert('Регистрация прошла успешно!');
            // Перенаправление или другая логика
        } else {
            alert(`Ошибка регистрации: ${data.error}`);
        }
    };

    return (
        <main className="register-container">
            <h2 className="register-title">Регистрация</h2>
            <div className="form-container">
                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-group">
                        <label>Имя пользователя:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">Зарегистрироваться</button>
                </form>
            </div>
        </main>
    );
}

export default Register;