import React from 'react'
import SideNav from '../components/SideNav'

export default function Dashboard() {
    return (
        <div className="dashboard container-fluid">
            <SideNav />
            <div className="dashboardMain">
                <h1>This is Dashboard</h1>
            </div>
        </div>
    )
}