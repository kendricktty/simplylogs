import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import DashboardQuickAction from "../components/Dashboard/DashboardQuickAction";
import FeaturedInfo from "../components/Dashboard/featuredInfo"

export default function Dashboard() {
  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="dashboardMain">
        <Header pageName={"Dashboard"} />
        <DashboardQuickAction />
        <FeaturedInfo />
      </div>
    </div>
  );
}
