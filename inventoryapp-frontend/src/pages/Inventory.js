import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryNav from "../components/Inventory/InventoryNav";
import InventoryTable from "../components/Inventory/InventoryTable";
import EditProductForm from "../components/Inventory/EditProductForm";
import axios from "../axios/axios"

function Inventory() {
  //States
  const [showEditProduct, setShowEditProduct] = React.useState(false);
  const [dynamicData, setDynamicData] = React.useState([]);
  const [editFormParam, setEditFormParams] = React.useState({});

  // fetches frontend data
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/inventory")
        setDynamicData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])

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
        <Header pageName="Inventory" />
        <div className="inventoryDisplay">
          <InventoryNav />
          <div className="inventoryTable">
            <InventoryTable
              setShowEditProduct={setShowEditProduct}
              dynamicData={dynamicData}
              setDynamicData={setDynamicData}
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
