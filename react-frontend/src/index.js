import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Training from './Training';
import Test1 from './Test1';
import Test2 from './Test2';
import Writing from './Writing';
import Speaking from './Speaking';

function Main() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/training" element={<Training />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/speaking" element={<Speaking />} />
      </Routes>
    </Router>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
