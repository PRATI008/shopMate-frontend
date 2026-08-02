import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer';
import { IoIosSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import "./CSS/Product.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Product = () => {

  const [products, setProducts] = useState([])
  const api_url = import.meta.env.VITE_API_URL
  const fetchProduct = async () => {
    const res = await axios.get(`${api_url}/api/products/get-products`)
    setProducts(res.data.products);
    console.log("add product")
  }
  // const getProducts = async () =>{
  //   try {
  //     const products = await axios
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  useEffect(() => {
    fetchProduct()
  }, [])




  return (
    <>
      <Header />
      <div className="product-navbar">
        <h1>All Products</h1>

        <div className="search-bar">
          <IoIosSearch />
          <span>Search for products, categories...</span>
        </div>
        <div className="sort-by">
          <p>Sort by:</p>
          <select name="" id="">
            <option value="Featured">Featured</option>
            <option value="best seller">Best Seller</option>
            <option value="new arrivals">New Arrivals</option>
            <option value="High-Margin item">High-Margin Items</option>
            <option value="Seasonal Products">Seasonal Products</option>
            <option value="Discount Deals">Discount Deals</option>

          </select>
        </div>
      </div>

      {/* card section */}
      <div className="product-section">
        {
          products.map((item, index) => (
            <div className="card">
              <img src={item.Image} />
              <h3 >{item.productTitle}</h3>
              <p>₹{item.productPrice}</p>
              <button><FaCartShopping /> Add to Cart</button>
            </div>
          ))
        }
        {/* <div className="card">
  <img src="../images/bag1.png" alt="bag" />
  <p>Elegant Hangbag</p>
  <p>Rs.1,999</p>
  <button><FaCartShopping /> Add to Cart</button>
</div> */}

        {/* <div className="card">
  <img src="../images/shoes.jpg" alt="bag" />
  <p>White Sneakers</p>
  <p>Rs.2,299</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/smart-watch1.png" alt="bag" />
  <p>Smart Watch</p>
  <p>Rs.4,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/women-dress1.png" alt="bag" />
  <p>Women's dress</p>
  <p>Rs.1,499</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/uv-sunglasses.png" alt="bag" />
  <p>UV Sunglasses</p>
  <p>Rs.799</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/men-casual-shirt.jpg" alt="bag" />
  <p>men Casual Shirt</p>
  <p>Rs.1,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/wireless-headphone.png" alt="bag" />
  <p>Wireless Headphone</p>
  <p>Rs.4,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/indoor-plants.png" alt="bag" />
  <p>indoor Plants</p>
  <p>Rs.499</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/phone.jpg" alt="bag" />
  <p>i-phone </p>
  <p>Rs.95,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/earbuds1.png" alt="bag" />
  <p>Ear-buds</p>
  <p>Rs.3,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/laptop.png" alt="bag" />
  <p>Mac-book</p>
  <p>Rs.60,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}

        {/* <div className="card">
  <img src="../images/camera.png" alt="bag" />
  <p>Digital camera</p>
  <p>Rs.8,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}


        {/* <div className="card">
  <img src="../images/bag1.png" alt="bag" />
  <p>Elegant Hangbag</p>
  <p>Rs.1,999</p>
  <button><FaCartShopping /> Add to Cart</button>
</div>

<div className="card">
  <img src="../images/shoes.jpg" alt="bag" />
  <p>White Sneakers</p>
  <p>Rs.2,299</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/smart-watch1.png" alt="bag" />
  <p>Smart Watch</p>
  <p>Rs.4,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/women-dress1.png" alt="bag" />
  <p>Women's dress</p>
  <p>Rs.1,499</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/uv-sunglasses.png" alt="bag" />
  <p>UV Sunglasses</p>
  <p>Rs.799</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/men-casual-shirt.jpg" alt="bag" />
  <p>men Casual Shirt</p>
  <p>Rs.1,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/wireless-headphone.png" alt="bag" />
  <p>Wireless Headphone</p>
  <p>Rs.4,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/indoor-plants.png" alt="bag" />
  <p>indoor Plants</p>
  <p>Rs.499</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/phone.jpg" alt="bag" />
  <p>i-phone </p>
  <p>Rs.95,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/earbuds1.png" alt="bag" />
  <p>Ear-buds</p>
  <p>Rs.3,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/laptop.png" alt="bag" />
  <p>Mac-book</p>
  <p>Rs.60,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div>

<div className="card">
  <img src="../images/camera.png" alt="bag" />
  <p>Digital camera</p>
  <p>Rs.8,999</p>
  <button><FaCartShopping /> Add to Cart</button>

</div> */}
      </div>
      <Footer />
    </>
  )
}

export default Product