import React from "react";
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useEffect } from "react";
import axios from "../../../axios/axios";

export default function FeaturedInfo() {
  const [switchLogicState, setSwitchLogicState] = useState("Yesterday");
  const [switchOutputState, setSwitchOutputState] = useState("Daily");
  const [revenueMoneyState, setRevenueMoneyState] = useState(0);
  const [revenueRateState, setRevenueRateState] = useState(0);
  const [orderState, setOrderState] = useState(0);
  const [orderRateState, setOrderRateState] = useState(0);
  const [numberOfProductState, setNumberOfProductState] = useState(0);
  const [numberOfProductRateState, setNumberOfProductRateState] = useState(0);

  useEffect(() => {
    let apiRequestString = "/order?period=";
    if (switchOutputState.selected === "Daily") {
      setSwitchLogicState("Yesterday");
      apiRequestString += "daily";
    } else if (switchOutputState.selected === "Weekly") {
      setSwitchLogicState("Last Week");

      apiRequestString += "weekly";
    } else if (switchOutputState.selected === "Monthly") {
      setSwitchLogicState("Last Month");

      apiRequestString += "monthly";
    }

    async function fetchData() {
      const req = await axios.get(apiRequestString);
      const data = await req.data;

      setRevenueMoneyState(data.periodRevenue);
      setRevenueRateState(data.periodRevenueRate);
      setOrderState(data.periodOrder);
      setOrderRateState(data.periodOrderRate);
      setNumberOfProductState(data.periodNumberOfProducts);
      setNumberOfProductRateState(data.periodNumberOfProductsRate);
    }
    
    fetchData();
  }, [switchOutputState]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${revenueMoneyState.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            {(revenueRateState >= 0 ? `+` : ``) + revenueRateState}
            {revenueRateState >= 0 ? (
              <ArrowUpward className="arrow" />
            ) : (
              <ArrowDownward className="arrow" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orderState}</span>
          <span className="featuredMoneyRate">
            {(orderRateState >= 0 ? `+` : ``) + orderRateState}
            {orderRateState >= 0 ? (
              <ArrowUpward className="arrow" />
            ) : (
              <ArrowDownward className="arrow" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Products Sold</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{numberOfProductState}</span>
          <span className="featuredMoneyRate">
            {(numberOfProductRateState >= 0 ? `+` : ``) +
              numberOfProductRateState}
            {numberOfProductRateState >= 0 ? (
              <ArrowUpward className="arrow" />
            ) : (
              <ArrowDownward className="arrow" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <ToggleSwitch
        styles={{ maxWidth: "25%" }}
        values={["Daily", "Weekly", "Monthly"]}
        selected={switchOutputState}
        changeSelected={setSwitchOutputState}
      />
    </div>
  );
}
