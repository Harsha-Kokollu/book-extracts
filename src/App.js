// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookTable from './components/BookTable';
// import './App.css';
import './styles/styles.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BookTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
