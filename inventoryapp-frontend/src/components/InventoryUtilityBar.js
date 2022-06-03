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

  const [showForm, setForm] = React.useState(false);
  function addButtonPressed() {
    console.log(showForm);
    console.log("Pressed");
    setForm(!showForm);
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
        action=""
        method="GET"
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

      {showForm ? (
        <Form>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>ProductID</Form.Label>
            <Form.Control type="text" placeholder="ProductId" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Supplier</Form.Label>
            <Form.Control type="text" placeholder="Product Supplier" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Quanity</Form.Label>
            <Form.Control type="number" placeholder="Quantity" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price($)" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              setForm(false);
            }}
          >
            Submit
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setForm(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      ) : null}
    </div>
  );
}
