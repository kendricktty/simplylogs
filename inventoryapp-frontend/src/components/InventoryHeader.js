import React from 'react'

export default function InventoryHeader() {
    let currentdate = new Date()
    return (
        <div className="inventoryHeader">
            <h4 className="inventoryHeader--name">Inventory</h4>
            <h5>{`${currentdate.getDate()} / ${(currentdate.getMonth()+1)} / ${currentdate.getFullYear()}`}</h5>
        </div>
    )
}