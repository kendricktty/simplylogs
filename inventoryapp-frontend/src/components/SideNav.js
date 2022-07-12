import React from "react";

export default function SideNav(props) {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <i class="bx bxl-react"></i>
        <div className="logo_name">InventoryApp</div>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">
            <i class="bx bxs-dashboard"></i>
            <span className="sideNav--tabs">Dashboard</span>
            {/* <span className="tooltip">Dashboard</span> */}
          </a>
        </li>
        <li>
          <a href="/inventory">
            <i class="bx bx-package"></i>
            <span className="sideNav--tabs">Inventory</span>
            {/* <span className="tooltip">Inventory</span> */}
          </a>
        </li>
        <li>
          <a href="/sales">
            <i class="bx bx-stats"></i>
            <span className="sideNav--tabs">Sales</span>
            {/* <span className="tooltip">Sales</span> */}
          </a>
        </li>
        <li>
          <a href="/cashier">
            <i class="fa-solid fa-cart-shopping"></i>
            <span className="sideNav--tabs">Cashier</span>
            {/* <span className="tooltip">Sales</span> */}
          </a>
        </li>
        <li className="profile">
          <div className="profile-details">
            <img src="../../logo192.png" alt="profileImg" />
            <div className="name_job">
              <div className="name">Manager</div>
            </div>
            <a  onClick={() => props.handleLogout()}>
              <i class="bx bx-log-out" id="log_out"></i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}
