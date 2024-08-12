import React, { useState, useEffect  } from 'react';
import './Writing.css';

function Writing() {
  const [essay, setEssay] = useState('');
  const [result, setResult] = useState(null);
  const [topic, setTopic] = useState('');

  const topics = ['Pollution', 'Nature', 'Internet', 'My family'];

  useEffect(() => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
  }, []);

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
      <h2 style={{fontSize: "2.2rem", margin: "1rem"}}>Письменная часть</h2>
      <h1 style={{fontSize: "1.8rem", margin: "0 0 2rem 0"}}>{topic}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id="essay"
          value={essay}
          onChange={handleChange}
          className="essay-input"
          rows="20"
          cols="100"
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
