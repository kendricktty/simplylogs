import React from 'react'
import SideNav from '../components/SideNav'
import InventoryHeader from '../components/InventoryHeader';
import InventoryNav from '../components/InventoryNav';
import InventoryTable from '../components/InventoryTable';
import EditProductForm from '../components/EditProductForm'

import data from "../data/data.json";

function Inventory() {

  //States
  const [showEditProduct, setShowEditProduct] = React.useState(false);
  const [dynamicData, setDynamicData] = React.useState(data);

   // Integrate backend to frontend
  React.useEffect(() => {
    fetch('http://localhost:8001/inventory')
      .then(res => res.json())
      .then(data => setDynamicData(data[0]))

  }, [])

  return (
    <div className="inventory container-fluid">
      <SideNav />
      <div className="inventoryMain">
        <InventoryHeader />
        <div className="inventoryDisplay">
          <InventoryNav />
          <div className="inventoryTable">
            <InventoryTable setShowEditProduct={setShowEditProduct} dynamicData={dynamicData} setDynamicData={setDynamicData} />
            Generated Barcode:
            <div id='barcode'></div>
            <EditProductForm
              showEditProduct={showEditProduct}
              setShowEditProduct={setShowEditProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory;
