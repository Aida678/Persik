import React, { useState, useEffect } from 'react';
import './Test2.css';

function Test2() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/get_questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (answerIndex) => {
    // Обновите логику для проверки правильного ответа
    // Здесь мы предполагаем, что правильный ответ всегда под индексом 2
    if (answerIndex === 2) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="test2-container">
        <h2>Тестовая часть 2</h2>
        <p>Ваш результат: {score} из {questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test2-container">
      <h2>Тестовая часть 2</h2>
      <p>{currentQuestion.question}</p>
      <div className="answers">
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(index)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Test2;
