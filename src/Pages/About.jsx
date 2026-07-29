import React from "react";
import './CSS/About.css'
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { BsHandbag } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
const About = () => {
    return (

        <>
            <Header />
            <div className="about-outer">
                <div className="about-img">
                    <img src="../images/about-1.png" alt="about" />
                </div>
                <div className="about-content">
                    <p>OUR STORY</p>
                    <h1>Built with Passion, Delivered with Care.</h1>
                    <span>ShopMate was born of a simple idea- shopping should be easy, enjoyable and trustworthy. What started as a small initiative has now grown into a platform loved by thousands of customers.
                        <br /><br />
                        We paertner with trusted sellers and top brands to bring you products that you'll love. From everyday essentials to special finds, we've got it all.
                    </span><br />
                    <button>Learn More..</button>
                </div>
            </div>

            <div className="counter">
                
            
                    
                
                <div>
                  <div className="icon"><BsHandbag /></div>
                   <h1>10K+</h1> 
                   <p>Happy Customers</p>
                </div>
                <div>
                                       <div className="icon"><BsBoxSeam /></div>
                   <h1>5K+</h1> 
                   <p>Products</p>
                </div>
                <div>
                                       <div className="icon"><BsHandbag /></div>
                   <h1>99%</h1> 
                   <p>Satisfaction Rate</p>
                </div>
                <div>
                                       <div className="icon"><BsHandbag /></div>
                   <h1>50+</h1> 
                   <p>Cities Delivered</p>
                </div>
                </div>
            
            <div className="our-team">
                <h5>OUR TEAM</h5>
                <h1>The People Behind <span>ShopMate</span></h1>
                <p>A Passionate team working every day to bring you the best shopping experience.</p>
                <div className="image-outer">
               <div className="images">
                 <div className="person-images">
                    <img src="..\images\about-img1.png" alt="" />

                </div>
                <h1>Rohit Sharma</h1>
                <p>Founder & CEO</p>
                <span><FaInstagram /> <FaLinkedin /> <FaTwitter /> </span>
               </div>

               <div className="images">
                 <div className="person-images">
                    <img src="..\images\about-img2.png" alt="" />

                </div>
                <h1>Anjali Verma</h1>
                <p>Marketting Head</p>
                <span><FaInstagram /> <FaLinkedin /> <FaTwitter /> </span>
               </div>

               <div className="images">
                 <div className="person-images">
                    <img src="..\images\about-img3.png" alt="" />

                </div>
                <h1>Vikram Singh</h1>
                <p>Product Manager</p>
                <span><FaInstagram /> <FaLinkedin /> <FaTwitter /> </span>
               </div>

               <div className="images">
                 <div className="person-images">
                    <img src="..\images\about-img4.png" alt="" />

                </div>
                <h1>Neha Kapoor</h1>
                <p>Customer Support Lead</p>
                <span><FaInstagram /> <FaLinkedin /> <FaTwitter /> </span>
               </div>
                </div>

            </div>

            <div className="our-values">
                <h5>
                    OUR VALUES
                </h5>
                <h1>What Drives Us</h1>
<div className="customer-outer">
    <div className="customers-values">
        <span><FaInstagram /></span>
        <h4>Quality First</h4>
        <p>We never compromise on qulity. Our products are carefully selected to ensure you get the best.</p>
    </div>

    <div className="customers-values">
        <span><FaInstagram /></span>
        <h4>Customer Focused</h4>
        <p>You are at the heart of everything we do, your satisfaction is our top priority.</p>
    </div>

    <div className="customers-values">
        <span><FaInstagram /></span>
        <h4>Trust & Integrity</h4>
        <p>We believe in transparent practices and building long-term relatioships with our customers.</p>
        </div>

    <div className="customers-values">
        <span><FaInstagram /></span>
        <h4>Always Improving</h4>
        <p>We constantly Innovate and improve to bring you the latest and the greatest shopping experience.</p>
            </div>
</div>
            </div>

            <Footer />
        </>

    )
}
export default About