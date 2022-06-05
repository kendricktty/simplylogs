import React from "react";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

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
    category: ""
  })

  function handleSubmit(e) {
    e.preventDefault()
    const submittingData = formData
    submittingData.productId = parseInt(submittingData.productId)
    submittingData.quantity = parseInt(submittingData.quantity)
    console.log(submittingData)
    props.addData(submittingData)
    setFormData({
      productId: "",
      productName: "",
      supplier: "",
      quantity: "",
      price: "",
      category: ""
    })
    setShowForm(!showForm)
  }

  function handleCancel() {
    setFormData({
      productId: "",
      productName: "",
      supplier: "",
      quantity: "",
      price: "",
      category: ""
    })
    setShowForm(!showForm)
  }

  function handleChange(e) {
    const {name, value} = e.target
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function addButtonPressed() {
    setShowForm(!showForm);
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

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label >ProductID</Form.Label>
            <Form.Control
              type="number"
              placeholder="ProductId"
              name="productId"
              value={formData.productId} 
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              value={formData.productName} 
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Supplier"
              name="supplier"
              value={formData.supplier} 
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Quanity</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Quantity" 
              name="quantity"
              onChange={handleChange}
              value={formData.quantity} />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              // type="number"
              placeholder="Price($)"
              name="price"
              value={formData.price} 
              onChange={handleChange}/>
          </Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="kitchenware">KitchenWare</option>
            <option value="furnishings">Furnishings</option>
          </Form.Select>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
}
