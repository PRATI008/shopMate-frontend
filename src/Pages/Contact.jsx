import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import "./CSS/Contact.css"
import {
FaPhoneAlt,
FaEnvelope,
FaMapMarkerAlt,
FaHeadset,
FaPaperPlane
} from "react-icons/fa";
const Contact = () => {
  return (
    <>
    <Header/>
    
    <div className="contact-outer">
      <div className="first-box">
        <div className="first-box-content">
          <h5>CONTACT US</h5>
        <h1>We'd Love to Hear From <span>You!</span></h1>
        <p>Have a question, suggestion, or just want to say hello?
          Our team is here to help you
        </p>
        <button> <FaPaperPlane /> Get in Touch</button>
        </div>
        <div className="first-box-image">
          <img src="./images/contact1.png" alt="" />
        </div>
      </div>
    </div>

    <div className="contact-social">
<div className="social-box">
  <span><FaPhoneAlt /></span>
  <h5>Phone</h5>
  <p>+91 9287476334</p>
  <p>Mon- Sat, 9:00 AM - 6:00 PM</p>
</div>

<div className="social-box">
  <span><FaEnvelope /></span>
  <h5>Phone</h5>
  <p>+91 9287476334</p>
  <p>Mon- Sat, 9:00 AM - 6:00 PM</p>
</div>

<div className="social-box">
  <span>  <FaMapMarkerAlt /></span>
  <h5>Phone</h5>
  <p>+91 9287476334</p>
  <p>Mon- Sat, 9:00 AM - 6:00 PM</p>
</div>

<div className="social-box">
  <span> <FaHeadset />
</span>
  <h5>Phone</h5>
  <p>+91 9287476334</p>
  <p>Mon- Sat, 9:00 AM - 6:00 PM</p>
</div>
    </div>

<section className="contact-form-section">

        <div className="form-left">

          <span>SEND US A MESSAGE</span>

          <h2>How Can We <span>Help You?</span></h2>

          <p>
            Fill out the form and we'll contact you as soon as possible.
          </p>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message"
            ></textarea>

            <button>
              Send Message
            </button>

          </form>

        </div>

        <div className="form-right">

          <img src="./images/contact2.png" alt="" />

          <div className="feature">

            <h4>Quick Response</h4>

            <p>
              We respond within 24 hours.
            </p>

          </div>

          <div className="feature">

            <h4>Trusted Support</h4>

            <p>
              Friendly customer support.
            </p>

          </div>

          <div className="feature">

            <h4>Customer First</h4>

            <p>
              Satisfaction is our priority.
            </p>

          </div>

        </div>

      </section>

      {/*================ MAP =================*/}

      <section className="map">

        <h2>Our Location</h2>

        <iframe
          title="map"
          src="./images/contact2.png"
          loading="lazy"
        ></iframe>

      </section>

    

    <Footer />
    </>
  )
}

export default Contact