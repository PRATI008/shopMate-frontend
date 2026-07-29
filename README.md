<!-- header.jsx -->
import React, { useEffect , useState} from "react";
import './Header.css'
import { FaCartArrowDown ,FaRegHeart} from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
 
const navigate = useNavigate()    
const [isLogin,setisLogin] = useState(false)

const handleLogin =()=>{
    navigate('/login')
}
const handleSignUp =() => {
    navigate('/signup')
}


useEffect(()=>{
    if(sessionStorage.getItem('sessionId')){
        setisLogin(true)
    }else{
        setisLogin(false)
    }
})
    return (

        <>
            <div className="header-outer">
                <div className="header-logo">
                    <img src="./logo11.png" alt="logo" />
                </div>
                <div className="header-menu">
                    <ul>
                        <li>
                            <NavLink to='/' className={({isActive})=> `menu-item ${isActive ? "active":""}`}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/product' className={({isActive})=> `menu-item ${isActive ? "active":""}`}>Products</NavLink>
                            </li>
                             <li>
                            <NavLink to='/about'  className="menu-item">About</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className="menu-item">Contact</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="header-icons">
                    <FaCartArrowDown />
                    <FaRegHeart />
                    

                   <div className="Login-btn">

{isLogin ? <IoPerson /> :<button onClick={handleLogin} className="header-login-btn">Login</button>}
{isLogin ? "":<button onClick={handleSignUp} className="header-signup-btn">Signup</button>}
                </div>
                </div>

                
            </div>
        </>
    )
}
export default Header







<!-- header.css -->
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.header-outer{
    height: 70px;
    width: 100%;
    background-color: #031e2d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 5px 10px rgba(1, 0, 26, 0.15);
}
.header-logo{
    height: 160px;
    width: 20%;
}
.header-logo>img{
    height: 100%;
    width: 100%;
}
.header-menu{
    width: 50%;
    /* height: 100%; */
}

.header-menu>ul{
    height: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    /* gap: 30px; */
    /* background-color: red; */
    
}
.header-menu>ul>li{
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    color: white;

}

.header-icons{
   
    /* width: 15%; */
    display: flex;
    align-items: center;
    padding: 20px 0px;
    gap: 30px;
    font-size: 20px;
    color: white;
}
.active{
    color:orange;
}
.Login-btn{
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 15px;
}

.header-login-btn{
    padding: 6px 30px;
    
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    
    border: 2px solid white;
    border-radius: 5px;

}
'






login.jsx 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import "./CSS/Login.css";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api_url = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  const handleLogin = async (e) => {
    setLoading(true)
  e.preventDefault()
    try {

      const res = await axios.post(`${api_url}/api/user/login`, { email, password })
      console.log(res.data.roll);

      if(res.data.roll=="admin"){
        setLoading(false)
        return toast.error("User not found");
      }
      if(res.data.token){
        sessionStorage.setItem('sessionId',res.data.token)
         toast.success(res.data.message)
         setLoading(false)
      navigate('/profile')
     
      }else{
        setLoading(false)
        toast.error(res.data.message)
      }
     

    } catch (error) {
      toast.error(res.data.message)
      console.log(error);
      
    }


  };

  return (

    <>
      <Header />
      <div className="loginPage">
        <div className="loginBox">

          <div className="loginLeft">

          </div>

          <div className="loginRight">

            <form onSubmit={handleLogin}>

              <h2>Login</h2>

              <input
                type="email"
                placeholder="Enter your Email.." name="email" onChange={(e) => setEmail(e.target.value)} />



              <input
                type="password"
                placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />

              <div className="forgot">
                <Link to="#"> Forget Password</Link>

              </div>



              <button className="login-btn" onClick={handleLogin} disabled={loading}>
                {loading? "Logging.." :"Log in"}
              </button>

              <p>
                Don't have an account?

              </p>

            </form>

          </div>

        </div>
      </div>

    </>
  );
}

export default Login;"# shopMate-frontend" 
"# shopMate-frontend" 
