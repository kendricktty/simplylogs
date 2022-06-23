import "../../index.css";
import styles from "../../styles/dashboard.module.css";
import Calendar from "react-calendar";
export default function DashboardQuickAction() {
  return (
    <div>
      <i>Welcome Back Store Manager !</i>
      <div className="container ">
        <div className="row gx-5 ">
          <div class="v52_152 col-12">
            <img
              class="v52_156"
              src={require("../../icon/ExclamationIcon.png")}
            ></img>
            <span class="v52_155 pt-5">
              There are N Items running low on inventory
            </span>
          </div>
        </div>
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
              <Calendar />
            </div>
            <div class={"dashboardDisplay mt-3" + " " + styles.analytics}>
              <i>Analytics</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
