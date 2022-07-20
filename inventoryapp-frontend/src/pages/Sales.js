import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import SalesTable from "../components/Sales/SalesTable";
import styles from "../styles/sales.module.css";
import axios from '../axios/axios'




export default function Sales(props) {

  
  // Initialize the products to be empty at first
  const [order, setOrder] = React.useState([]);
  


  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/order')
      setOrder(res.data.orders)
    }
    fetchData()
  }, [])
  
  
  
  //handle logout
  function handleLogout() {
    localStorage.clear()
    props.setUser(null)
  }


  return (
    <div className="dashboard container-fluid">
      <SideNav handleLogout={handleLogout}/>
      <div className="salesMain">
        <Header pageName="Sales" logo="bx bx-stats"/>
        <SalesTable data={order}/>
      </div>
    </div>
  );
}
