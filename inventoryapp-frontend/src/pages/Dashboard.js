import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import FeaturedInfo from "../components/Dashboard/FeaturedInfo/FeaturedInfo";
import DashboardQuickAction from "../components/Dashboard/DashboardQuickAction";
import Chart from "../components/Dashboard/Chart/Chart";
import { salesData } from "../components/Dashboard/dummyData";
import WidgetLarge from "../components/Dashboard/Widget/WidgetLarge";
import WidgetSmall from "../components/Dashboard/Widget/WidgetSmall";
import Card from "../components/Dashboard/Cards/Card";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import axios from '../axios/axios'

export default function Dashboard(props) {

  const [data, setData] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/order?get12MonthsData=true")
        setData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])


  //handle logout
  function handleLogout() {
    localStorage.clear()
    props.setUser(null)
  }

  return (
    <div className="dashboard container-fluid">
      <SideNav handleLogout={handleLogout} user={props.user}/>
      <div className="dashboardMain">
        <Header pageName={"Dashboard"} logo="bx bxs-dashboard" />
        <DashboardQuickAction />
        <FeaturedInfo />

        {data.monthlyRevenue && <Carousel plugins={["arrows", "infinite"]}>
          <Chart
            data={data.monthlyRevenue.reverse()}
            title="Sales Analytics"
            grid
            dataKey="Revenue"
          />
          <Card />
          <WidgetSmall />
        </Carousel>}
        <div className="dashboardWidgets">
          <WidgetLarge />
          <WidgetSmall />
        </div>
      </div>
    </div>
  );
}
