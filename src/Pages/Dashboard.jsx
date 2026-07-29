import React from 'react'
import "../Pages/CSS/Dashboard.css"
import Header from '../Component/Header';
import { IoHome } from "react-icons/io5";
const Dashboard = () => {
  return (
    <>
    <Header />
    <div className="dashboard-outer">
<div className="dashboard-top">
<IoHome />
<p>DASHBOARD</p>
</div>

<div className="dashboard-menu">
  <ul>
    <li> Products</li>
    <li>  Categories</li>
    <li> Orders</li>
    <li> Customers</li>
    <li> Payments</li>
    <li> Inventory</li>
    <li> Coupons</li>
    <li> Reviews</li>
    <li>  Analytics</li>
    <li> Notifications</li>
    <li> Settings</li>
    <li> Profile</li>
    <li> Logout</li>
  </ul>
</div>
    </div>
    </>
  )
}

export default Dashboard