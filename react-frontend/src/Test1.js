import React, { useState, useEffect } from 'react';
import './Test1.css';

const words = [
  { word: 'apple', correct: true },
  { word: 'bananana', correct: false },
  { word: 'orange', correct: true },
  { word: 'cherrys', correct: false },
  // еще 14 слов по тому же шаблону
];

function Test1() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (currentWordIndex >= words.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleAnswer(null);
          return 5;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentWordIndex]);

  const handleAnswer = (answer) => {
    if (answer !== null) {
      const isCorrect = words[currentWordIndex].correct === answer;
      if (isCorrect) {
        setScore(score + 1);
      }
    }

    setCurrentWordIndex(currentWordIndex + 1);
    setTimeLeft(5);
  };

  if (currentWordIndex >= words.length) {
    return (
      <div className="test1-container">
        <h2 style={{fontSize: "2.5rem"}}>Тестовая часть 1</h2>
        <p style={{fontSize: "2.5rem"}}>Ваш результат: {score} из {words.length}</p>
      </div>
    );
  }

  return (
    <div className="test1-container">
      <h2 style={{fontSize: "2.5rem"}}>Тестовая часть 1</h2>
      <p  style={{fontSize: "1.5rem"}}>Есть ли такое слово?</p>
      <p className="word">{words[currentWordIndex].word}</p>
      <div className="buttons">
        <button id="ybtn" onClick={() => handleAnswer(true)}>Да</button>
        <button id="nbtn" onClick={() => handleAnswer(false)}>Нет</button>
      </div>
      <p>Оставшееся время: {timeLeft} секунд</p>
    </div>
  );
}

export default Test1;
