import React from 'react'
import SideNav from '../components/SideNav'
import InventoryHeader from '../components/InventoryHeader';
import InventoryNav from '../components/InventoryNav';
import InventoryUtilityBar from '../components/InventoryUtilityBar';
import InventoryTable from '../components/InventoryTable';

function Inventory() {
  return (
    <div className="inventory container-fluid">
        <SideNav />
        <div className="inventoryMain">
          <InventoryHeader />
          <div className="inventoryDisplay">
            <InventoryNav />
            {/* <InventoryUtilityBar /> */}
            <div className="inventoryTable">
                <InventoryTable />
                Generated Barcode:
                <div id='barcode'></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Inventory;
