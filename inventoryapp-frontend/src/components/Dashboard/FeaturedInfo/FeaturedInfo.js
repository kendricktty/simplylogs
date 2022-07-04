import React from "react";
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
export default function featuredInfo() {
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
        <span className="featuredSub">Compared to last month</span>
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
        <span className="featuredSub">Compared to last month</span>
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
        <span className="featuredSub">Compared to last month</span>
      </div>
      <ToggleSwitch values={["Daily", "Weekly", "Monthly"]} selected="Daily" />
    </div>
  );
}
