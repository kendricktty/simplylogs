import React from 'react'
import SideNav from './components/SideNav'
import InventoryHeader from './components/InventoryHeader';
import InventoryNav from './components/InventoryNav';

function App() {
  return (
    <div className="inventory container-fluid">
        <SideNav />
        <div className="inventoryMain">
          <InventoryHeader />
          <div className="inventoryDisplay">
            <InventoryNav />
          </div>
        </div>
    </div>
  )
}

export default App;
