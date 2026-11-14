import React, { useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import './CSS/Contact.css';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeadset,
  FaPaperPlane,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSend = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.warn('Please fill in your Name, Email, and Message!');
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${api_url}/api/message/send-message`, {
        name,
        email,
        phone,
        message
      });

      if (res.data && res.data.success) {
        toast.success('Your message has been sent successfully! Our team will contact you soon. 📩');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast.error(res.data?.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error: Could not reach the server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-outer">
        {/* Top Hero Banner */}
        <div className="first-box">
          <div className="first-box-content">
            <span className="contact-badge">GET IN TOUCH</span>
            <h1>
              We'd Love to Hear From <span>You!</span>
            </h1>
            <p>
              Have a question about an order, product sizing, returns, or business inquiry?
              Our customer happiness team is always here for you.
            </p>
            <a href="#contact-form-section" className="scroll-btn">
              <FaPaperPlane /> Send a Message
            </a>
          </div>
          <div className="first-box-image">
            <img
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&auto=format&fit=crop&q=80"
              alt="Customer support team"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600';
              }}
            />
          </div>
        </div>

        {/* 4 Social / Contact Info Cards */}
        <div className="contact-social">
          <div className="social-box">
            <div className="icon-wrapper">
              <FaPhoneAlt />
            </div>
            <h5>Call Us</h5>
            <p className="highlight">+91 9129937416</p>
            <p className="subtext">Mon - Sat, 9:00 AM - 7:00 PM</p>
          </div>

          <div className="social-box">
            <div className="icon-wrapper">
              <FaEnvelope />
            </div>
            <h5>Email Support</h5>
            <p className="highlight">support@shopmate.com</p>
            <p className="subtext">Guaranteed reply within 24 hours</p>
          </div>

          <div className="social-box">
            <div className="icon-wrapper">
              <FaMapMarkerAlt />
            </div>
            <h5>Headquarters</h5>
            <p className="highlight">Sector O, Aliganj, Lucknow</p>
            <p className="subtext">Uttar Pradesh, 226021, India</p>
          </div>

          <div className="social-box">
            <div className="icon-wrapper">
              <FaHeadset />
            </div>
            <h5>Live Help</h5>
            <p className="highlight">24/7 Dedicated Care</p>
            <p className="subtext">Always ready to solve issues</p>
          </div>
        </div>

        {/* Interactive Form Section */}
        <section className="contact-form-section" id="contact-form-section">
          <div className="form-left">
            <span className="section-label">SEND US A MESSAGE</span>
            <h2>
              How Can We <span>Help You?</span>
            </h2>
            <p>
              Fill out the form below and our team will get back to your email within a few hours.
            </p>

            <form onSubmit={handleSend}>
              <div className="input-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  placeholder="E.g. Priya Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Your Message *</label>
                <textarea
                  rows="5"
                  placeholder="Write your query, issue, or feedback here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="send-btn" disabled={submitting}>
                {submitting ? (
                  'Sending Message...'
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="form-right">
            <div className="right-card-header">
              <h3>Why Reach Out to Us?</h3>
              <p>We pride ourselves on transparent and fast customer resolution.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaClock />
              </div>
              <div>
                <h4>Prompt Resolution</h4>
                <p>98% of queries are resolved within one working day.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <div>
                <h4>Verified Order Assistance</h4>
                <p>Help with order tracking, damaged parcels, or returns.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <div>
                <h4>Friendly Real People</h4>
                <p>Talk to real human agents, no robotic auto-responses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps Embed */}
        <section className="map-section">
          <h2>Find Our Office on Map</h2>
          <div className="map-frame-box">
            <iframe
              title="ShopMate Headquarters Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.331238804917!2d80.93883777264227!3d26.884949576662768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a0f8bfdfb%3A0xe6bf44b6045cf15d!2sAliganj%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
