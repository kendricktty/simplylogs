import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import FeaturedInfo from "../components/Dashboard/FeaturedInfo/FeaturedInfo";
import DashboardQuickAction from "../components/Dashboard/DashboardQuickAction";
import Chart from "../components/Dashboard/Chart/Chart";
import { salesData } from "../components/Dashboard/dummyData";
import WidgetLarge from "../components/Dashboard/Widget/WidgetLarge";
import WidgetSmall from "../components/Dashboard/Widget/WidgetSmall";

export default function Dashboard() {
  return (
    <div className="dashboard container-fluid">
      <SideNav />
      <div className="dashboardMain">
        <Header pageName={"Dashboard"} />
        <DashboardQuickAction />
        <FeaturedInfo />
        <Chart
          data={salesData}
          title="Sales Analytics"
          grid
          dataKey="Active Sales"
        />
        <div className="dashboardWidgets">
          <WidgetLarge />
          <WidgetSmall />
        </div>
      </div>
    </div>
  );
}
