import React from "react";
import AddProductForm from "./AddProductForm"


export default function InventoryUtilityBar(props) {
  // const handleSubmit = event => {
  //     event.preventDefault();
  //     alert('You have submitted the form.')
  //     setSearch('')
  // }

  // const [search, setSearch] = React.useState('')
  // This is the function when the button is pressed
  // to add items to data.json

  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productId: "",
    productName: "",
    supplier: "",
    quantity: "",
    price: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const submittingData = formData;

    //need to change to Integer for productId and quantit and set id to productid
    submittingData.productId = parseInt(submittingData.productId);
    submittingData.id = submittingData.productId;
    submittingData.quantity = parseInt(submittingData.quantity);
    console.log(submittingData);
    props.addData(submittingData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittingData),
    };
    fetch("http://localhost:3000/inventory", requestOptions);
    setFormData({
      productId: "",
      productName: "",
      supplier: "",
      quantity: "",
      price: "",
      category: "",
    });
    setShowForm(!showForm);
  }

  function handleCancel() {
    setFormData({
      productId: "",
      productName: "",
      supplier: "",
      quantity: "",
      price: "",
      category: "",
    });
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
    <div className="InventoryUtilityBar row">
      {/* <div class="row select-view col-lg-4 col-sm-12">
                <div class="col-lg-12 my-3">
                    <div class="pull-right">
                        <div class="btn-group">
                            <button class="btn btn-outline-primary" id="list">
                                List View
                            </button>
                            <button class="btn btn-outline-secondary" id="grid">
                                Grid View
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
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
      <button class="btn btn-outline-primary col-lg-2 col-sm-6 utilityBtn my-3">
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
          formData={formData} />
      )}
    </div>
  );
}
