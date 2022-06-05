import React from "react";
import ReactDOM, { render } from "react-dom";
import DataTable from "react-data-table-component";
import CustomMaterialPagination from "../materialui/CustomMaterialPagination";
import data from "../data/data.json";
import Barcode from "react-barcode";
import InventoryUtilityBar from "./InventoryUtilityBar";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
} from "react-bootstrap";


/*
https://react-data-table-component.netlify.app/?path=/docs/api-columns--page -- link to 
  table  api
*/

export default function InventoryTable() {

  // States
  const [dynamicData, setDynamicData] = React.useState(data);
  const [filterText, setFilterText] = React.useState("");
  const [show, setShow] = React.useState(false);

  // Integrate backend to frontend

  React.useEffect(() => {
    fetch('http://localhost:8001/inventory')
      .then(res => res.json())
      .then(data => setDynamicData(data[0]))

  }, [])



  // filter function

  // show Edit From
  // const [editForm, setEditForm] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = dynamicData.inventory.filter(
    (item) =>
      item.productName &&
      item.productName.toLowerCase().includes(filterText.toLowerCase())
  );


  //adds new item to the current data
  function handleAddData(data) {
    setDynamicData((prevState) => {
      console.log(prevState);
      const newState = prevState;
      newState.inventory.push(data);
      return newState;
    });
  }

  function toggleForm() {
    setShow(prevState => !prevState)
    console.log(show)
  }

  function EditForm() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Modal show={show} onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ProductID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ProductId"
                  name="productId"
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  name="productName"
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Supplier</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Supplier"
                  name="supplier"
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Quanity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Price($)"
                  name="price"
                />
              </Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select name="category">
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="kitchenware">KitchenWare</option>
                <option value="furnishings">Furnishings</option>
              </Form.Select>
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button variant="outline-secondary">Cancel</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  //InventoryUtility
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <InventoryUtilityBar
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        addData={(data) => handleAddData(data)}
      />
    );
  }, [filterText, resetPaginationToggle]);

  //testing editing of data only can edit name for now//
  const handleEditButtonClick = (data) => {
    toggleForm()
    if (show) {
      ReactDOM.render(<EditForm />, document.getElementById('editForm'))
    }

    // console.log(editForm);

    // let newName = prompt("Enter new name: ");
    // if (newName === null) {
    //   newName = data.productName;
    // }
    // const id = data.productId;
    // setDynamicData((prevState) => ({
    //   inventory: prevState.inventory.map((el) =>
    //     el.productId === id ? { ...el, productName: newName } : el
    //   ),
    // }));
  }

  const handleGenerateButtonClick = (data) => {
    const productName = data.productName;
    ReactDOM.render(
      <Barcode value={productName} />,
      document.getElementById("barcode")
    );
  };

  const columns = [
    {
      name: "ProductID",
      selector: (row) => row.productId,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      name: "ProductName",
      selector: (row) => row.productName,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      cell: (data) => (
        <button
          onClick={() => handleEditButtonClick(data)}
          className="btn btn-warning"
        >
          edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (data) => (
        <button
          onClick={() => handleGenerateButtonClick(data)}
          className="btn btn-success"
        >
          generate
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    },
  ];

  return (
    <DataTable
      className="dataTable"
      columns={columns}
      data={filteredItems}
      fixedHeader={true}
      selectableRows
      // actions={
      //     (<InventoryUtilityBar />)
      // }
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      //adding pagination to the table

      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      paginationComponent={CustomMaterialPagination}
    />
  );
}
