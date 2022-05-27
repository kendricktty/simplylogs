import React from 'react'
import SideNav from './components/SideNav'
import InventoryHeader from './components/InventoryHeader';

function App() {
  return (
    <div className="inventory">
        <SideNav />
        <div className="main-inventory">
          <InventoryHeader />
        </div>
    </div>
  )
}

export default App;
