import React from "react";
import Header from "../Component/Header";
import './CSS/Hero.css'
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "../Component/Footer";


const Home=()=>{
    return(
        <>
        <Header/>
      
       
        {/* hero-start*/}
<section className="hero">
    <div className="hero-left">
        <span className="hero-tag">Best Quality Products</span>
        <h1>
            Discover:Fashion <br/>
            That <span>Defines</span> You
        </h1>
        <p>Explore the latest trends in Fashion, accesories and more.</p>
<div className="hero-button">
    <button className="shop-btn"> Shop Now &nbsp; &nbsp; <span><FaArrowRightLong /></span></button>
    <button className="explore-btn"> Explore Details</button>
</div>
    </div>
    <div className="hero-right">
        <img src="./hero-section.png" alt="" />
    </div>
</section>

{/* hero-end*/}

{/* about-start */}



{/* about-end */}

  <Footer/>
        </>
    )
}
export default Home