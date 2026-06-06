import React from 'react';

function Navigation({ setCurrentSection }) {
  return (
    <nav>
      <a onClick={() => setCurrentSection('home')}>Home</a>
      <a href="#services">Services</a>
      <a href="#gallery">Gallery</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}

export default Navigation;
