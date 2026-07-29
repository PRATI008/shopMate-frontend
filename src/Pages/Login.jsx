import React, { useState } from "react";
import "./CSS/Login.css";
import Header from "../Component/Header";

import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";

import {
  MdEmail,
  MdLock,
} from "react-icons/md";

import { Link } from "react-router-dom";
const Login = () => {

const [showPassword,setShowPassword]=useState(false);

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const handleSubmit=(e)=>{

e.preventDefault();

console.log(email,password);

}

return(
<>
<Header/>

<div className="login-page">

<div className="login-container">
  <div className="login-left">

<div className="circle one"></div>
<div className="circle two"></div>

<h1>
Welcome Back 👋
</h1>

<p>

Login to continue shopping with ShopMate and enjoy amazing offers every day.

</p>

<div className="mobile-image">

<img src="/images/login-banner.png" alt="login"/>

</div>

</div><div className="login-right">

<form onSubmit={handleSubmit}>

<h2>Login Account</h2>

<p>

Enter your details to login.

</p>
<div className="input-box">

<MdEmail className="input-icon"/>

<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

</div>
<div className="input-box">

<MdLock className="input-icon"/>

<input

type={showPassword ? "text":"password"}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<span

className="eye"

onClick={()=>setShowPassword(!showPassword)}

>

{

showPassword ?

<FaEyeSlash/>

:

<FaEye/>

}

</span>

</div>
<div className="login-options">

<label>

<input type="checkbox"/>

Remember Me

</label>

<Link to="#">

Forgot Password?

</Link>

</div>
<button

className="loginBtn"

type="submit"

>

Login

</button>
<div className="divider">

<span>

OR

</span>

</div>
<button

type="button"

className="googleBtn"

>

<FaGoogle/>

Continue with Google

</button>
<button

type="button"

className="facebookBtn"

>

<FaFacebookF/>

Continue with Facebook

</button>
<p className="bottomText">

Don't have an account?

<Link to="/signup">

Sign Up

</Link>

</p>

</form>

</div>

</div>

</div>

</>

)

}

export default Login;
