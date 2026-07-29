import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CSS/SignUp.css";
import axios from 'axios';
import {toast} from 'react-toastify';

const SignUp=()=>{
 const [formData,setFormData] = useState({
  fname:"",
  lname:"",
  email:"",
  phone:"",
  password:"",
  dob:"",
  gender:""
 })

 const api_url = import.meta.env.VITE_API_URL
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${api_url}/api/user/signup`,formData)
      toast.success("User Registered Suceessfully!");

    } catch (error){
      console.log(error);
    }
    console.log(formData);

  }

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })

  }


  return (
    <>
    <section className="loginPage">
      <div className="loginBox">

        <div className="loginLeft">
         <img src="./images.signup.png" alt="" />
        </div>

        <div className="loginRight">

          <form>

            <h2>Create Account</h2>
            <p>Fill in the details to create your account</p>
<br />
            <div className="name-email">

    <div>
        <label>Full Name</label>
        <input type="text" placeholder="Enter Your Name"/>
    </div>

    <div>
        <label>Email Address</label>
        <input type="email"  placeholder="Enter Your Email"/>
    </div>

</div>

 <div className="name-email">

    <div>
        <label>Phone Number</label>
        <input type="text"  placeholder="Enter Your Phone No."/>
    </div>

    <div>
        <label>Password</label>
        <input type="password" placeholder="Enter Your Password"/>
    </div>

</div>


 <label>Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="Confirm your password" name='confirmPassword' onChange={handleChange}
            />
            <br />

<label>Gender</label>
<br />




<select name="Gender" onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  
</select>

<label>Date of Birth</label>
<input type="date" name='dob' onChange={handleChange} />


           
            <button className="sign-btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <div className="or">
              <span>or signup with</span>
            </div>
            <div className="social-btn"></div>

            <p>
              Don't have an account?
              <Link to="/signup"> Register</Link>
            </p>

          </form>

        </div>

      </div>
    </section>
    </>
  );
}

export default SignUp;