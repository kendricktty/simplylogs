import React from "react";
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useEffect } from "react";

const revenueArr = [
  {
    revenue: 2415,
    revenueRate: 51.4,
    cost: 1234,
    costRate: 20.4,
    sales: 2222,
    salesRate: -10.4,
  },
  {
    revenue: 1111,
    revenueRate: -81.4,
    cost: 2456,
    costRate: 78.4,
    sales: 1854,
    salesRate: -58.9,
  },
  {
    revenue: 3333,
    revenueRate: 141.4,
    cost: 3344,
    costRate: 100.4,
    sales: 897,
    salesRate: -210.4,
  },
];

export default function FeaturedInfo() {
  let arrIndex = 0;
  const [switchLogicState, setSwitchLogicState] = useState("Yesterday");
  const [switchOutputState, setSwitchOutputState] = useState("Daily");
  const [revenueMoneyState, setRevenueMoneyState] = useState(0);
  const [revenueRateState, setRevenueRateState] = useState(0);
  const [costMoneyState, setCostMoneyState] = useState(0);
  const [costRateState, setCostRateState] = useState(0);
  const [saleMoneyState, setSalesMoneyState] = useState(0);
  const [salesRateState, setSalesRateState] = useState(0);

  const isMoneyPositive = money => {};

  useEffect(() => {
    if (switchOutputState.selected === "Daily") {
      setSwitchLogicState("Yesterday");
      arrIndex = 0;
    } else if (switchOutputState.selected === "Weekly") {
      setSwitchLogicState("Last Week");
      arrIndex = 1;
    } else if (switchOutputState.selected === "Monthly") {
      setSwitchLogicState("Last Month");
      arrIndex = 2;
    }
    setRevenueMoneyState(revenueArr[arrIndex].revenue);
    setRevenueRateState(revenueArr[arrIndex].revenueRate);
    setCostMoneyState(revenueArr[arrIndex].cost);
    setCostRateState(revenueArr[arrIndex].costRate);
    setSalesMoneyState(revenueArr[arrIndex].sales);
    setSalesRateState(revenueArr[arrIndex].salesRate);
  }, [switchOutputState]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${revenueMoneyState.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            {(revenueRateState >= 0 ? `+` : ``) + revenueRateState}
            {revenueRateState >= 0 ? <ArrowUpward /> : <ArrowDownward />}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${costMoneyState.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            {(costRateState >= 0 ? `+` : ``) + costRateState}
            {costRateState >= 0 ? <ArrowUpward /> : <ArrowDownward />}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${saleMoneyState.toFixed(2)}</span>
          <span className="featuredMoneyRate">
            {(salesRateState >= 0 ? `+` : ``) + salesRateState}
            {salesRateState >= 0 ? <ArrowUpward /> : <ArrowDownward />}
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <ToggleSwitch
        values={["Daily", "Weekly", "Monthly"]}
        selected={switchOutputState}
        changeSelected={setSwitchOutputState}
      />
    </div>
  );
}
