import React, { useState } from 'react';
import { submitInquiry } from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await submitInquiry(formData);
      setMessage({ type: 'success', text: 'Inquiry submitted successfully! We will contact you soon.' });
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setMessage({ type: 'error', text: 'Failed to submit inquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p><strong>Phone:</strong> 9652680012</p>
        <p><strong>Email:</strong> donthojusai24@gmail.com</p>
      </div>

      <h3>Send Inquiry</h3>
      {message && (
        <div className={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Requirement"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
}

export default Contact;
