import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
                <h2 style={{margin: "2rem 0 0 3rem", fontSize: "2rem"}}>Тренировочный блок</h2>
                <p>Этот блок доступен только после регистрации.</p>
                <p>Пожалуйста, войдите в систему или зарегистрируйтесь.</p>
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
        <main>
            <section id="training-wrapper">
                <h2 style={{margin: "2rem 0 0 3rem", fontSize: "2rem"}}>Тренировочный блок</h2>
                <ol id="olList">
                    <li><Link style={{textDecoration: "none", margin: "0 2rem", fontSize: "1.5rem", color: "black"}}
                              to="/test1">Тестовая часть 1</Link></li>
                    <li><Link style={{textDecoration: "none", margin: "0 2rem", fontSize: "1.5rem", color: "black"}}
                              to="/test2">Тестовая часть 2</Link></li>
                    <li><Link style={{textDecoration: "none", margin: "0 2rem", fontSize: "1.5rem", color: "black"}}
                              to="/writing">Письменная часть</Link></li>
                    <li><Link style={{textDecoration: "none", margin: "0 2rem", fontSize: "1.5rem", color: "black"}}
                              to="/speaking">Разговорная часть</Link></li>
                </ol>
            </section>
            <section id="text-wrapper">
                <h1>Тренировочный блок</h1>
                <p style={{fontSize: "1.2rem", margin: "0 2rem 1rem 2rem"}}>
                    Но советы хороши только в том случае, если сопровождаются практикой. Поэтому на этом сайте вы
                    сможете
                    ознакомиться
                    не только с форматом экзамена и советами по его сдаче, но и с заданиями, которые могут
                    встретиться
                    при его
                    прохождении.
                    Следует помнить, что хоть к формату Duolingo English Test трудно подготовиться, это остаётся
                    возможным. В
                    некоторых
                    заданиях вы даже получите комплексную оценку своего ответа, что может узнать свои слабые места и
                    подтянуть
                    их к времени
                    сдачи оффициального экзамена.
                </p>

                <h1>Тестовая часть</h1>
                <p style={{fontSize: "1.2rem", margin: "0 2rem 1rem 2rem"}}>
                    В этом разделе вы сможете попрактиковаться в выборе существующих английских слов и в заполнении
                    пробелов в
                    тексте.
                    Незнакомые слова нужно выписывать, ведь они могут встретиться и на реальном экзамене. Что
                    касается
                    выбора
                    подходящих
                    слов, набивая руку на тренажёре вы сможете узнать тонкости употребления того или иного слова в
                    контексте,
                    что бесспорно
                    повысит ваш общий уровень владения языком.
                </p>

                <h1>Письменная часть</h1>
                <p style={{fontSize: "1.2rem", margin: "0 2rem 1rem 2rem"}}>
                    В этом разделе будут даны темы для эссе. Постоянно тренируясь в написании текстов, вы сможете
                    раскрыть свой
                    пассивный
                    словарный запас и понять, чего не хватает вашим эссе, чтобы дотягивать до желаемого уровня. С
                    этой
                    задачей
                    поможет
                    проверка от искусственного интеллекта, который не только даст оценку в баллах, но и объяснит, за
                    что
                    был
                    снижен балл и
                    как можно улучшить эссе.
                </p>
            </section>
        </main>
    )
        ;
}

export default Training;
