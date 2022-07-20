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
    }

    fetchData();
  }, []);

  function outputData(data) {
    return data.map((order, index) => {
      return (
        <tr className="widgetSmTr">
          <td className="widgetSmInvoice">Invoice No.{order.invoiceNumber}</td>
          {/* <td className="widgetLgQuantity">{product.quantity}</td> */}
          <td className="widgetSmRevenue">${order.revenue.toFixed(2)}</td>
        </tr>
      );
    });
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Recent Orders</span>
      <table className="widgetSmTable">
        <tr className="widgetSmTr">
          <th>Invoice Number</th>
          <th>Revenue</th>
        </tr>
        {data && outputData(data)}
      </table>
    </div>
  );
}
