import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
export default function Sales(props) {
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
      </div>
    </div>
  );
}
