import React, { useState } from 'react';
import './contactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-form-wrapper">
        <h2 className={`contact-title ${submitted ? 'submitted' : ''}`}>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label className="contact-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`contact-input ${submitted ? 'fade-out' : 'fade-in'}`}
              required
            />
          </label>
          <label className="contact-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`contact-input ${submitted ? 'fade-out' : 'fade-in'}`}
              required
            />
          </label>
          <label className="contact-label">
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`contact-textarea ${submitted ? 'fade-out' : 'fade-in'}`}
              required
            />
          </label>
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
