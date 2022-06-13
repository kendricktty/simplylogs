import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="dashboardMain">
        <Header pageName="Dashboard" />
      </div>
    </div>
  );
}
