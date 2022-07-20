import "./WidgetSmall.css";
import { Visibility } from "@material-ui/icons";
import React from "react";

export default function WidgetSmall() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Recent Orders</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          /> */}
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <div className="widgetSmOrder">hellooo</div>
        </li>
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          /> */}
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <div className="widgetSmOrder">hellooo</div>
        </li>
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          /> */}
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <div className="widgetSmOrder">hellooo</div>
        </li>
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          /> */}
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <div className="widgetSmOrder">hellooo</div>
        </li>
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          /> */}
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <div className="widgetSmOrder">hellooo</div>
        </li>
      </ul>
    </div>
  );
}
