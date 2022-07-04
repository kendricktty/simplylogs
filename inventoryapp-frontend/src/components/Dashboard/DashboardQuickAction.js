// import styles from "../../styles/dashboard.module.css";
// import Calendar from "react-calendar";
import "./DashboardQuickAction.css";
import { Error } from "@material-ui/icons";
import React from "react";

import "react-calendar/dist/Calendar.css";

export default function DashboardQuickAction() {
  return (

    <div className="quickActionContainer">
      
      <Error></Error>
      <span className="quickActionText">
        There are N items with less than 25% of inventory
      </span>
    </div>
  );
}
