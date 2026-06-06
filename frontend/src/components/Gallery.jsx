import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const data = await fetchGallery();
        setImages(data);
        setError(null);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) return <div className="loading">Loading gallery...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="gallery" className="section">
      <h2>Our Work</h2>
      <div className="gallery">
        {images.length > 0 ? (
          images.map(image => (
            <img
              key={image.id}
              src={image.image_url}
              alt={image.title}
              title={image.description}
            />
          ))
        ) : (
          <p>No gallery images available</p>
        )}
      </div>
    </section>
  );
}

export default Gallery;
