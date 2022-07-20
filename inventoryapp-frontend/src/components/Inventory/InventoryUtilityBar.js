import React from "react";
import AddProductForm from "./AddProductForm"
import axios from "../../axios/axios"
import { CsvBuilder } from 'filefy';


export default function InventoryUtilityBar(props) {

  console.log(props.dynamicData);
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
    if(props.productCount !== undefined) {
        setFormData({
          productId: props.productCount + 1, 
          productName: "",
          supplier: "",
          quantity: "",
          price: "",
          category: "",
        })
    }

   
  }, [props])

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
    console.log(formData);
    setShowForm(prevState => !prevState);
  }


  //set col/row fields for the csv
  const columns=[
    {title:"ProductID",field:"productId"},
    {title:"ProductName",field:"productName"},
    {title:"Supplier",field:"supplier"},
    {title:"Quantity",field:"quantity"},
    {title:"Price",field:"price"},
  ]

  //data for the csv
  let formattedInventoryData = [];
  if (props.dynamicData.inventory) {
    formattedInventoryData = props.dynamicData.inventory.map( ({productId,productName,supplier,quantity,price}) => 
    ({productId,productName,supplier,quantity,price}))
  }
  

  //export to csv function
  function exportCSV() {
    const columnTitles = columns.map(columnDef => columnDef.title);
    
    const csvData = formattedInventoryData.map(rowData =>
      columns.map(columnDef => rowData[columnDef.field]),
    );
  
    
    const builder = new CsvBuilder(`Inventory_${new Date().toDateString()}.csv`)
          .setColumns(columnTitles)
          .addRows(csvData)
          .exportFile();
  
    return builder;
  }

  return (
    <div className="InventoryUtilityBar row">
      <form
        className="searchBar col-lg-4 col-sm-12 my-3"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control rounded"
            id="search"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={props.filterText}
            onChange={props.onFilter}
          />
          <button
            type="button"
            onClick={props.onClear}
            class="btn btn-outline-primary"
          >
            Clear
          </button>
        </div>
      </form>
      <div className="col-lg-4"></div>
      <button 
        class="btn btn-outline-primary col-lg-2 col-sm-6 utilityBtn my-3"
        onClick={() => exportCSV()}
      >
        Export
      </button>
      <button
        class="btn btn-outline-primary col-lg-2 col-sm-6 utilityBtn my-3"
        onClick={() => addButtonPressed()}
      >
        Add +
      </button>

      {/* conditional rendering */}
      {showForm && (
        <AddProductForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
          formData={formData} 
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}
