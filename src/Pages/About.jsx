import React from "react";
import "./CSS/About.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { BsHandbag, BsBoxSeam, BsShieldCheck } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaTwitter, FaAward, FaHeart, FaHandshake, FaRocket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="about-wrapper">
        {/* Story Section */}
        <div className="about-outer">
          <div className="about-img">
            <img
              src="/images/about-1.png"
              alt="About ShopMate Story"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80";
              }}
            />
          </div>

          <div className="about-content">
            <span className="about-badge">OUR STORY</span>
            <h1>Built with Passion, Delivered with Care.</h1>
            <p className="description">
              ShopMate was born out of a simple idea — online shopping should be seamless, enjoyable, and completely trustworthy. What started as a dedicated initiative has now grown into a flourishing platform loved by thousands of happy shoppers across the nation.
              <br /><br />
              We partner directly with verified manufacturers, artisan creators, and top global brands to bring you curated products at unbeatable value. From daily wardrobe essentials to trending lifestyle finds, we deliver quality you can rely on.
            </p>
            <div className="about-actions">
              <button className="primary-btn" onClick={() => navigate("/product")}>
                Explore Our Collection
              </button>
              <button className="secondary-btn" onClick={() => navigate("/contact")}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* Counter Stats Strip */}
        <div className="counter">
          <div className="counter-item">
            <div className="counter-icon-box"><BsHandbag /></div>
            <h1>10K+</h1>
            <p>Happy Customers</p>
          </div>

          <div className="counter-item">
            <div className="counter-icon-box"><BsBoxSeam /></div>
            <h1>5K+</h1>
            <p>Verified Products</p>
          </div>

          <div className="counter-item">
            <div className="counter-icon-box"><BsShieldCheck /></div>
            <h1>99%</h1>
            <p>Satisfaction Rate</p>
          </div>

          <div className="counter-item">
            <div className="counter-icon-box"><FaCity /></div>
            <h1>50+</h1>
            <p>Cities Delivered</p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="our-values">
          <span className="values-badge">OUR VALUES</span>
          <h2>What Drives Everything We Do</h2>
          <p className="values-subtext">The pillars that define the ShopMate shopping experience.</p>

          <div className="customer-outer">
            <div className="customers-values">
              <span className="value-icon"><FaAward /></span>
              <h4>Quality First</h4>
              <p>We never compromise on craftsmanship. Every item undergoes rigorous quality checks before dispatch.</p>
            </div>

            <div className="customers-values">
              <span className="value-icon"><FaHeart /></span>
              <h4>Customer Focused</h4>
              <p>You are at the center of every decision we make. Your complete satisfaction is our highest reward.</p>
            </div>

            <div className="customers-values">
              <span className="value-icon"><FaHandshake /></span>
              <h4>Trust & Integrity</h4>
              <p>Transparent pricing, genuine warranty policies, and honest long-term relationships with our community.</p>
            </div>

            <div className="customers-values">
              <span className="value-icon"><FaRocket /></span>
              <h4>Always Improving</h4>
              <p>Constantly innovating our logistics, mobile experience, and support to bring you the best online retail journey.</p>
            </div>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="our-team">
          <span className="team-badge">OUR TEAM</span>
          <h2>The People Behind <span>ShopMate</span></h2>
          <p className="team-subtext">A passionate group of creators, technologists, and customer advocates working for you every day.</p>

          <div className="image-outer">
            <div className="team-card">
              <div className="person-images">
                <img
                  src="/images/about-img1.png"
                  alt="Rohit Sharma"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400";
                  }}
                />
              </div>
              <h3>Rohit Sharma</h3>
              <p className="role">Founder & CEO</p>
              <div className="social-links">
                <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
                <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>

            <div className="team-card">
              <div className="person-images">
                <img
                  src="/images/about-img2.png"
                  alt="Anjali Verma"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400";
                  }}
                />
              </div>
              <h3>Anjali Verma</h3>
              <p className="role">Marketing Head</p>
              <div className="social-links">
                <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
                <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>

            <div className="team-card">
              <div className="person-images">
                <img
                  src="/images/about-img3.png"
                  alt="Vikram Singh"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400";
                  }}
                />
              </div>
              <h3>Vikram Singh</h3>
              <p className="role">Product Manager</p>
              <div className="social-links">
                <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
                <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>

            <div className="team-card">
              <div className="person-images">
                <img
                  src="/images/about-img4.png"
                  alt="Neha Kapoor"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400";
                  }}
                />
              </div>
              <h3>Neha Kapoor</h3>
              <p className="role">Customer Support Lead</p>
              <div className="social-links">
                <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
                <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
