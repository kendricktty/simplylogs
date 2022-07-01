import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
export default function Cashier() {
  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="salesMain">
        <Header pageName="Sales" />
      </div>
    </div>
  );
}
