import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Game from './components/Game';

const App = () => {
  return (
    <>
      <Header />
      <Game />
      <Footer />
    </>
  )

};

createRoot(
  document.querySelector('#app'),
).render(<App />);
