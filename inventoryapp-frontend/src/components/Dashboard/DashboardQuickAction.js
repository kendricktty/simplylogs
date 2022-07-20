import "./DashboardQuickAction.css";
import { Error } from "@material-ui/icons";
import React from "react";
import "react-calendar/dist/Calendar.css";
import axios from "../../axios/axios";

export default function DashboardQuickAction(props) {
  const [data, setData] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/inventory?getAllProducts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const filteredData = res.data.inventory.filter(
          product => product.quantity < 10
        ).length;
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="quickActionContainer">
      <Error></Error>
      <span className="quickActionText">
        There are {data} items with less than 10 quantities in the current
        inventory
      </span>
    </div>
  );
}
