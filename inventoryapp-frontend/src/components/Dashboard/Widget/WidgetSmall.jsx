import "./WidgetSmall.css";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";

export default function WidgetSmall() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/order?getRecentOrders=true", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = req.data.recentOrders;
      setData(data);
      console.log(data);
    }

    fetchData();
  }, []);

  function outputData(data) {
    return data.map(order => (
      <li className="widgetSmListItem">
        <div className="widgetSmUser">
          <span className="widgetSmText">Invoice {order.invoiceNumber}</span>
        </div>
        <div className="widgetSmRevenue">${order.revenue.toFixed(2)}</div>
      </li>
    ));
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Recent Orders</span>
      <ul className="widgetSmList">{data && outputData(data)}</ul>
    </div>
  );
}
