import React, { useState, useEffect } from 'react';
import './Test2.css';

function Test2() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/get_questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex]?.answers[2]; // Добавлена проверка на наличие данных
    if (selectedAnswer === correctAnswer) {
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
        <h2 style={{fontSize: "2.5rem"}}>Тестовая часть 2</h2>
        <p style={{fontSize: "2.5rem"}}>Ваш результат: {score} из {questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Добавлена проверка на наличие текущего вопроса
  if (!currentQuestion || !currentQuestion.question) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="test2-container">
      <h2 style={{fontSize: "2.5rem"}}>{currentQuestion.question[0]}</h2>
      <p style={{fontSize: "2.5rem"}}>{currentQuestion.question[1]}</p>
      <div className="answers">
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Test2;
