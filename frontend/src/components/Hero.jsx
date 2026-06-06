import React from 'react';

function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <h2>Transforming Spaces into Beautiful Homes</h2>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>Modern | Elegant | Functional Designs</p>
      <button className="btn" onClick={scrollToContact}>Get a Quote</button>
    </section>
  );
}

export default Hero;
