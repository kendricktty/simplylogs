import React from "react";
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useEffect } from "react";

const revenueArr = [
  {
    daySalesRevenue: 2415,
    daySalesRate: 51.4,
  },
  {
    revenue: 2415,
    rate: 51.4,
  },
  {
    revenue: 2415,
    rate: 51.4,
  }
];

export default function FeaturedInfo() {
  const [switchLogicState, setSwitchLogicState] = useState("Yesterday");
  const [switchOutputState, setSwitchOutputState] = useState("Daily");

  useEffect(() => {
    console.log(switchOutputState);

    if (switchOutputState.selected === "Daily") {
      setSwitchLogicState("Yesterday");
    } else if (switchOutputState.selected === "Weekly") {
      setSwitchLogicState("Last Week");
    } else if (switchOutputState.selected === "Monthly") {
      setSwitchLogicState("Last Month");
    }
  }, [switchOutputState]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            +51.4
            <ArrowUpward />
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,222</span>
          <span className="featuredMoneyRate">
            -1.4
            <ArrowDownward />
          </span>
        </div>
        <span className="featuredSub">Compared to {switchLogicState}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -11.4
            <ArrowDownward />
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
