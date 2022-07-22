import React from "react";
import PersonIcon from "@mui/icons-material/Person";
export default function SideNav(props) {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <img src={"../../logo.jpg"} width="42" height="42" />
        <div className="logo_name">Simply Logs</div>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">
            <i class="bx bxs-dashboard"></i>
            <span className="sideNav--tabs">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/inventory">
            <i class="bx bx-package"></i>
            <span className="sideNav--tabs">Inventory</span>
          </a>
        </li>
        <li>
          <a href="/sales">
            <i class="bx bx-stats"></i>
            <span className="sideNav--tabs">Sales</span>
          </a>
        </li>
        <li>
          <a href="/cashier">
            <i class="fa-solid fa-cart-shopping"></i>
            <span className="sideNav--tabs">Cashier</span>
          </a>
        </li>
        <li className="profile">
          <div className="profile-details">
            <PersonIcon fontSize="large" style={{ marginLeft: "1.5vw" }} />
            <div className="name_job">
              <div className="name">
                {JSON.parse(localStorage.getItem("user")).name.toUpperCase()}
              </div>
            </div>
            <a onClick={() => props.handleLogout()}>
              <i class="bx bx-log-out" id="log_out"></i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}
