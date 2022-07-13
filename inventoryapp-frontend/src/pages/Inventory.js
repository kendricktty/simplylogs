import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import InventoryNav from "../components/Inventory/InventoryNav";
import InventoryTable from "../components/Inventory/InventoryTable";
import EditProductForm from "../components/Inventory/EditProductForm";
import axios from "../axios/axios"

function Inventory(props) {
  //States
  const [showEditProduct, setShowEditProduct] = React.useState(false);
  const [dynamicData, setDynamicData] = React.useState([]);
  const [editFormParam, setEditFormParams] = React.useState({});
  const [category, setCategory] = React.useState("")

  // fetches backend data
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
  async function handleSave() {
    const submittingData = editFormParam
    const id = submittingData.productId;

    //converts to appropriate datatypes
    submittingData.quantity = parseInt(submittingData.quantity);
    submittingData.price = parseFloat(submittingData.price).toFixed(2)
    setDynamicData(prevState => ({
      inventory: prevState.inventory.map(el =>
        el.productId === id ? submittingData : el
      ),
    }));

  

    try {
      await axios.patch(`/inventory/${submittingData._id}`,submittingData)
    } catch (error) {
      console.log(error)
    }
    setShowEditProduct(false);
  }

  //handleAdd

  function handleAddData(data) {
    setDynamicData(prevState => {
      if (prevState.inventory === undefined) {
        return { inventory: [data] };
      }
      return { inventory: [...prevState.inventory, data] };
    });

  }

  //handle logout
  function handleLogout() {
    props.setUser(false)
  }

  return (
    <div className="inventory container-fluid">
      <SideNav handleLogout={handleLogout}/>
      <div className="inventoryMain">
        <Header pageName="Inventory" logo="bx bx-package"/>
        <div className="inventoryDisplay">
          <InventoryNav setCategory={setCategory}/>
          <div className="inventoryTable">
            <InventoryTable
              setShowEditProduct={setShowEditProduct}
              dynamicData={dynamicData}
              setDynamicData={setDynamicData}
              handleAddData={handleAddData}
              setEditFormParams={setEditFormParams}
              category={category}
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
