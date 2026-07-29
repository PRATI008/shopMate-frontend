import React from 'react'
import Header from './Component/Header'
import About  from './Pages/About'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Footer from './Component/Footer'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
   <>
  <Router>
    <Routes>

<Route path='/' element={<Home/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/product' element={<Product/>}/>
<Route path='/contact' element={<Contact/>}/>

<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/profile' element={<Profile />}/>
{/* <Route path='/gallery' element={<Gallery/>}/> */}

    </Routes>
  </Router>

   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
   </>
  )
}

export default App