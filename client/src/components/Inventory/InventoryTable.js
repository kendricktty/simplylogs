import React from "react";
import ReactDOM from "react-dom";
import Barcode from "react-barcode";
import axios from "../../axios/axios"
import AddProductForm from "./AddProductForm"
import MaterialTable from "material-table";
import { CsvBuilder } from 'filefy';



export default function InventoryTable(props) {

  const [inventoryData, setInventoryData] = React.useState(props.dynamicData.inventory)

  
  React.useEffect(() => {
      const filteredItems = props.dynamicData.inventory
      ? props.dynamicData.inventory.filter((item) => item.category.includes(props.category)) : []
      setInventoryData(filteredItems) 
  },[props.category, props.dynamicData.inventory])

  const columns=[
    {title:"ProductID",field:"productId"},
    {title:"Product Name",field:"productName"},
    {title:"Supplier",field:"supplier"},
    {title:"Quantity",field:"quantity"},
    {title:"Price",field:"price"},
  ]

  const handleEditButtonClick = (data) => {
    props.setShowEditProduct((prevState) => !prevState);
    props.setEditFormParams(data);
  };

  const handleGenerateButtonClick = (data) => {
    const {productId, productName} = data
    ReactDOM.render(
      <>
        <div class="alert alert-light" role="alert">
          {productName}
        </div>
        <Barcode value={productId} />
      </>
      ,
      document.getElementById("barcode")
    );
  };


  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productId: "", 
    productName: "",
    supplier: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [errorMsg, setErrorMsg] = React.useState("")
  
  

  React.useEffect(() => {
    if(props.dynamicData.inventory !== undefined) {
        setFormData({
          productId: props.dynamicData.inventory.length + 1, 
          productName: "",
          supplier: "",
          quantity: "",
          price: "",
          category: "",
        })
    }

   
  }, [props.dynamicData.inventory])

  async function handleSubmit(e) {
    e.preventDefault();
    const submittingData = formData;

    //need to change to Integer for productId and quantity and set id to productid
    submittingData.productId = parseInt(submittingData.productId);
    // submittingData.id = submittingData.productId;
    submittingData.quantity = parseInt(submittingData.quantity);
    submittingData.price = parseFloat(submittingData.price).toFixed(2)
    try {
      await axios.post('/inventory', submittingData)
    } catch (error) {
      setErrorMsg(error.response.data.msg)
      return
    }
    
    setErrorMsg("")
    props.handleAddData(submittingData);
    

    setShowForm(!showForm);
  }

  function handleCancel() {
    setErrorMsg("")
    setShowForm(!showForm);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function addButtonPressed() {
    setShowForm(prevState => !prevState);
  }

  return (
    <>
      <AddProductForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
          formData={formData} 
          errorMsg={errorMsg}
          showForm={showForm}
          setShowForm={setShowForm}
      />
      <MaterialTable
        title="Inventory"
        data = {inventoryData}
        columns = {columns}
        options = {
          {
            search: false,
            paging: true,
            filtering: true,
            pageSize: 5,
            maxBodyHeight: "500px",
            exportButton: {
                csv: true,
            },
            exportCsv: () => {
              const columnTitles = columns
                  .map(columnDef => columnDef.title);
              
              const csvData = inventoryData.map(rowData =>
                    columns.map(columnDef => rowData[columnDef.field]),
                  );
            
              const builder = new CsvBuilder(`Inventory_${new Date().toDateString()}_.csv`)
                    .setColumns(columnTitles)
                    .addRows(csvData)
                    .exportFile();
            
              return builder;
            }
            ,
            actionsColumnIndex: -1
          }
        }
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit product',
            onClick: (event, rowData) => {
              handleEditButtonClick(rowData)
            }  
          },
          {
            icon: 'view_column',
            tooltip: 'generate barcode',
            onClick: (event, rowData) => {
              handleGenerateButtonClick(rowData)
            }  
          },
          {
            icon: 'add',
            tooltip: 'add product',
            isFreeAction: true,
            onClick: (event, rowData) => {
              addButtonPressed()
            }  
          }]
        }
      >

      </MaterialTable>
    </>
  )
}
