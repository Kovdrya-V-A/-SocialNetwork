import React from 'react';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Nav from './Components/Nav';
import './App.css';


const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="main">
        <Nav />
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default App;
