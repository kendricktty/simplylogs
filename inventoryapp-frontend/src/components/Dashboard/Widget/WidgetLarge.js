import "./WidgetLarge.css";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";

const icons = [
  <i class="bx bxs-bowl-rice"></i>, //food
  <i class="bx bx-fridge"></i>, //kitchenware
  <i class="bx bx-bed"></i>, //furnishing
];

export default function WidgetLarge() {
  const [data, setData] = useState([]);
  const [dateOfPurchase, setDateOfPurchase] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/order?getRecentProducts=true", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = req.data.recentProducts;
      setData(data);
      let orderDates = req.data.orderDates;
      if (orderDates.length !== 0) {
        orderDates = orderDates.map(orderDate => orderDate.substring(0, 10));
      }
      setDateOfPurchase(orderDates);
    }

    fetchData();
  }, []);

  function outputData(data) {
    return data.map((product, index) => {
      return (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            {product.category === "Food"
              ? icons[0]
              : product.category === "KitchenWare"
              ? icons[1]
              : icons[2]}
            <span className="widgetLgName">{product.productName}</span>
          </td>
          <td className="widgetLgDate">{dateOfPurchase[index]}</td>
          <td className="widgetLgQuantity">{product.quantity}</td>
          <td className="widgetLgRevenue">${product.price.toFixed(2)}</td>
        </tr>
      );
    });
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recent Products Sold</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Product</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTH">Quantity</th>
          <th className="widgetLgTH">Revenue</th>
        </tr>

        {data && outputData(data)}
      </table>
    </div>
  );
}
