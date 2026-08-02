import React, {useState} from 'react'
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
import axios from 'axios';
const Contact = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [message, setMessage] = useState('')
const  api_url = import.meta.env.VITE_API_URL
const handleSend = async(e)=>{
  e.preventDefault()
  try {
    const res = await axios.post(`${api_url}/api/message/send-message`,{name,email,phone,message})
    if(res.data.contact){
      alert("Data Saved");
    }
  } catch (error) {
    console.log(error);
  }
  console.log({name,email,phone,message});
}


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
  <p>+91 9129937416</p>
  <p>Mon- Sat, 9:00 AM - 6:00 PM</p>
</div>

<div className="social-box">
  <span><FaEnvelope /></span>
  <h5>Email</h5>
  <p>+91 prdwivedi707@gmail.com</p>
  <p>We reply within 24 hours.</p>
</div>

<div className="social-box">
  <span>  <FaMapMarkerAlt /></span>
  <h5>Address</h5>
  <p>Sector O JankiPuram Aliganj Lucknow </p>
  <p>Uttar Pradesh, India</p>
</div>

<div className="social-box">
  <span> <FaHeadset />
</span>
  <h5>Support</h5>
  <p>24/7 Customer Support</p>
  <p>We're here to help you anytime.</p>
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
              onChange={(e)=> setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              onChange={(e)=> setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your Phone"
              onChange={(e)=> setPhone(e.target.value)}
            />

            <textarea
              placeholder="Your Message"
              onChange={(e)=>setMessage(e.target.value)}
            ></textarea>

            <button onClick={handleSend}>
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
  title="DigiCoders Location"
  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d20320.99185183343!2d80.9943141843135!3d26.906017519510613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x399bfd90f852511b%3A0xea3004cdf494ecbb!2sDigiCoders%20Technologies%20Private%20Limited%2C%20Best%20Software%2FWebsite%2FMobile%20App%20Development%20Company%20in%20Lucknow%2C%202nd%20Floor%2C%20B%2C%2036%2C%20near%20Ram%20Ram%20Bank%20Chauraha%2C%20Sector%20O%2C%20Aliganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021!3m2!1d26.9046421!2d80.9495932!5e1!3m2!1sen!2sin!4v1785581971272!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
/>
        

      </section>

    

    <Footer />
    </>
  )
}

export default Contact