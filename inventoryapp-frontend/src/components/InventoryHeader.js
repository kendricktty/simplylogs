import React from 'react'

export default function InventoryHeader() {
    const currentdate = new Date()
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return (
        <div className="inventoryHeader">
            <div className="inventoryHeaderLogo">
                <i class='bx bx-package'></i>
                <h4 className="inventoryHeader--name">Inventory</h4>
            </div>
            <h5>{`${currentdate.getDate()} / ${(currentdate.getMonth()+1)} / ${currentdate.getFullYear()} , ${days[currentdate.getDay()]}`}</h5>
        </div>
    )
}