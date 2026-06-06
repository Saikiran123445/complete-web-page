import React, { useState, useEffect } from 'react';
import { fetchServices } from '../services/api';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) return <div className="loading">Loading services...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="services" className="section">
      <div className="section-header">
        <img src="/services.section.jpg" alt="Services" className="section-image" />
        <h2>Our Services</h2>
      </div>
      <div className="services">
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
      </div>
    </section>
  );
}

export default Services;
