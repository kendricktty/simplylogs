import React from 'react'

export default function SideNav() {
    return (
        <div className="SideNav">
            <h4 className="SideNav--title">InventoryApp</h4>
            <ul className="SideNav--tabs">
                <li className="tabs">
                    <a href="">
                        <span class="material-symbols-outlined tab-icon">
                        space_dashboard
                        </span>Dash
                    </a>
                </li>
                <li className="tabs">
                    <a href="">
                        <span class="material-symbols-outlined tab-icon">
                        inventory_2
                        </span>Inventory
                    </a>
                </li>
                <li className="tabs">
                    <a href="">
                        <span class="material-symbols-outlined tab-icon">
                        insights
                        </span>Sales
                    </a>
                </li>
            </ul>
            <div className="SideNav--user">
                <img src="../../logo192.png" className="profile-picture"/>
                TheManager
            </div>
            <div>
            <ul className="tabs">
                <li>
                    <a href="">
                    <span class="material-symbols-outlined tab-icon">
                    logout
                    </span>Logout
                    </a>
                </li>
            </ul>
            </div>
        </div>
    )
}