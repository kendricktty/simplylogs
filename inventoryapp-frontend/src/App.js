import React from 'react'
import SideNav from './components/SideNav'
import InventoryHeader from './components/InventoryHeader';
import InventoryNav from './components/InventoryNav';
import InventoryUtilityBar from './components/InventoryUtilityBar';

function App() {
  return (
    <div className="inventory container-fluid">
        <SideNav />
        <div className="inventoryMain">
          <InventoryHeader />
          <div className="inventoryDisplay">
            <InventoryNav />
            <InventoryUtilityBar />
          </div>
        </div>
    </div>
  )
}

export default App;
