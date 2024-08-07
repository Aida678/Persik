import React from 'react';
import { Link } from 'react-router-dom';

function Training() {
  return (
    <div>
      <h2>Тренировочный блок</h2>
      <ul>
          {/*<p>123</p>*/}
        <li><Link to="/test1">Тестовая часть 1</Link></li>
        <li><Link to="/test2">Тестовая часть 2</Link></li>
        <li><Link to="/writing">Письменная часть</Link></li>
        <li><Link to="/speaking">Разговорная часть</Link></li>
      </ul>
    </div>
  );
}

export default Training;
