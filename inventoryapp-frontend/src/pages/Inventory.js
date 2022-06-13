import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryNav from "../components/Inventory/InventoryNav";
import InventoryTable from "../components/Inventory/InventoryTable";
import EditProductForm from "../components/Inventory/EditProductForm";

import data from "../data/data.json";

function Inventory() {
  //States
  const [showEditProduct, setShowEditProduct] = React.useState(false);
  //fetches data from server on load if there are saved cookies on browser load from browser
  const [dynamicData, setDynamicData] = React.useState(
    JSON.parse(localStorage.getItem("inventory")) ||
      fetch("http://localhost:8001/inventory")
        .then(res => res.json())
        .then(data => setDynamicData(data[0]))
  );
  const [editFormParam, setEditFormParams] = React.useState({});

  // Integrate backend to frontend
  // React.useEffect(() => {
  //   fetch('http://localhost:8001/inventory')
  //     .then(res => res.json())
  //     .then(data => setDynamicData(data[0]))

  // }, [])

  //saves it back to the browser memory
  React.useEffect(() => {
    console.log("changed");
    localStorage.setItem("inventory", JSON.stringify(dynamicData));
  }, [dynamicData]);

  //editForm
  function handleChange(e) {
    const { name, value } = e.target;
    setEditFormParams(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  //editForm save
  function handleSave() {
    const id = editFormParam.productId;
    setDynamicData(prevState => ({
      inventory: prevState.inventory.map(el =>
        el.productId === id ? editFormParam : el
      ),
    }));

    setShowEditProduct(false);
  }

  //handleAdd

  function handleAddData(data) {
    setDynamicData(prevState => {
      if (prevState.inventory === undefined) {
        console.log("empty");
        return { inventory: [data] };
      }
      return { inventory: [...prevState.inventory, data] };
    });
  }

  return (
    <div className="inventory container-fluid">
      <SideNav />
      <div className="inventoryMain">
        <Header pageName="Inventory"/>
        <div className="inventoryDisplay">
          <InventoryNav />
          <div className="inventoryTable">
            <InventoryTable
              setShowEditProduct={setShowEditProduct}
              dynamicData={dynamicData}
              handleAddData={handleAddData}
              setEditFormParams={setEditFormParams}
            />
            Generated Barcode:
            <div id="barcode"></div>
            <EditProductForm
              showEditProduct={showEditProduct}
              setShowEditProduct={setShowEditProduct}
              editFormParam={editFormParam}
              setEditFormParams={setEditFormParams}
              handleChange={handleChange}
              handleSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
