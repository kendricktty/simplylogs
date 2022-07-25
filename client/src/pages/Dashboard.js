import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import FeaturedInfo from "../components/Dashboard/FeaturedInfo/FeaturedInfo";
import DashboardQuickAction from "../components/Dashboard/DashboardQuickAction";
import Chart from "../components/Dashboard/Chart/Chart";
import WidgetLarge from "../components/Dashboard/Widget/WidgetLarge";
import WidgetSmall from "../components/Dashboard/Widget/WidgetSmall";
// import Carousel from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
import axios from "../axios/axios";
import MyPieChart from "../components/Dashboard/Chart/MyPieChart";


export default function Dashboard(props) {
  const [data, setData] = React.useState({ year: null, week: null });

  React.useEffect(() => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res1 = await axios.get("/order?get12MonthsData=true", header);
        const res2 = await axios.get("/order?get7DaysData=true", header);
        setData({ year: res1.data, week: res2.data.dayInAWeek });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //handle logout
  function handleLogout() {
    localStorage.clear();
    props.setUser(null);
  }

  return (
    <div className="dashboard container-fluid">
      <SideNav handleLogout={handleLogout} user={props.user} />
      <div className="dashboardMain">
        <Header pageName={"Dashboard"} logo="bx bxs-dashboard" />
        <DashboardQuickAction />
        <FeaturedInfo />

        {data.year !== null && (
          <Carousel plugins={["arrows", "infinite"]}>
            <Chart
              data={data.year.monthlyRevenue.reverse()}
              title="Sales Analytics"
              grid
              dataKey="Revenue"
            />
            <MyPieChart data={data.week} />
          </Carousel>
        )}
        <div className="dashboardWidgets">
          <WidgetLarge />
          <WidgetSmall />
        </div>
      </div>
    </div>
  );
}
