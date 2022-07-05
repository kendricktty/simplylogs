import React, { useState, useEffect } from "react";

import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { HomeWorkOutlined } from "@material-ui/icons";

const holidayAPI =
  "https://rjchow.github.io/singapore_public_holidays/api/" +
  Number(new Date().getFullYear());

const client = axios.create({
  baseURL: holidayAPI,
});

export default function Card() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get("/data.json").catch(e => {
        console.log(e);
      });
      setPosts(request?.data);
    }
    fetchdata();
  }, []);

  console.log(posts);

  return (
    <div class="row gx-4 gy-3 mt-2">
      <div className="col-md-6 ">
        <div class={"dashboardDisplay" + " " + styles.actions}>
          <i>Quick Actions</i>
          <div class="dashboard-icon mt-3">
            <img
              src="../../../dashboardIcon.png"
              style={{ width: "20px" }}
              className="mt-1"
            />
            <span>
              <b className="ps-2 mt-5">
                <a
                  href="/sales"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Add Sales
                </a>
              </b>
            </span>
          </div>
          <div class="dashboard-icon mt-3">
            <img
              src="../../../dashboardIcon.png"
              style={{ width: "20px" }}
              className="mt-1"
            />
            <span>
              <b className="ps-2 mt-5">
                <a
                  href="/inventory"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Add Inventory
                </a>
              </b>
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6  ">
        <div class={"dashboardDisplay" + " " + styles.events}>
          <i>Upcoming Events</i>
        </div>
        <div class={"dashboardDisplay mt-3" + " " + styles.analytics}>
          <i>Analytics</i>
        </div>
      </div>
    </div>
  );
}
