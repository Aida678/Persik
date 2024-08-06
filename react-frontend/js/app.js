import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import './styles.css';

function App() {
  return (
    <div>
      <Header />
      {/* Остальная часть страницы */}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
