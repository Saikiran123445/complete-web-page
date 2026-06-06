import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <div className="App">
      <Header />
      <Navigation setCurrentSection={setCurrentSection} />
      {currentSection === 'home' && <Hero />}
      <Services />
      <Gallery />
      <Contact />
      <a href="https://wa.me/919652680012" target="_blank" rel="noopener noreferrer" className="whatsapp">
        💬
      </a>
      <Footer />
    </div>
  );
}

export default App;
