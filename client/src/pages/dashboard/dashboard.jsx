import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/navbar'
import Sidebar from "../../components/sidebar/sidebar";
import './dashboard.scss';
import Table from '../../components/table/table';
import Widget from '../../components/widget/Widget';
import Tabs from '../../components/tabs/tab';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {



  const navigate = useNavigate();
const auths = localStorage.getItem("token");
useEffect(() => {
if(auths) {
  navigate('/dashboard')
}

}, [auths, navigate])



  return (
<div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="balance" />
        </div>
        <div className='tabs'>
            <Tabs />

        </div>

        <div className="listContainer" >
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Dashboard