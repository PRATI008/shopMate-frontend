import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect , useState} from 'react'
const Profile = () => {
  const navigate = useNavigate()
    useEffect(()=>{
        if(!sessionStorage.getItem('sessionId')){
            Navigate('/')
        }
      })
  return (
    <>
    <Header />
   <h1>this is profile page</h1>
    <Footer />
    </>
  )
}

export default Profile