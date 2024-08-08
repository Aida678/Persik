import React, { useState } from 'react';
import './Writing.css';

function Writing() {
  const [essay, setEssay] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setEssay(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/evaluate_essay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ essay })
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="writing-container">
      <h2>Письменная часть</h2>
      <img src="/static/images/writing.jpg" alt="Writing" className="writing-image" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="essay">Введите ваше эссе:</label>
        <textarea
          id="essay"
          value={essay}
          onChange={handleChange}
          className="essay-input"
          rows="20"
          cols="80"
          placeholder="Начните писать здесь..."
        ></textarea>
        <button type="submit" className="submit-button">Сохранить эссе</button>
      </form>
      {result && (
        <div className="result">
          <h3>Результат:</h3>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <div>
              <p>Sentiment: {result.polarity}</p>
              <p>Subjectivity: {result.subjectivity}</p>
              <p>Confidence: {result.polarity_confidence}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Writing;
