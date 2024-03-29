import React from "react";
import {
  Form,
  Button,
  Modal
} from "react-bootstrap";

export default function AddProductForm(props) {
  const handleClose = () => props.setShowForm(false);

  return (
    <>
    <Modal show={props.showForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            {props.errorMsg != "" && <div className='alert alert-danger'>{props.errorMsg}</div>}
            <Form.Label>ProductID</Form.Label>
            <Form.Control
              type="number"
              placeholder="ProductId"
              name="productId"
              min={0}
              value={props.formData.productId}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              value={props.formData.productName}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Supplier"
              name="supplier"
              value={props.formData.supplier}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Quanity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantity"
              name="quantity"
              min={0}
              onChange={props.handleChange}
              value={props.formData.quantity}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price($)"
              step={0.01}
              min={0}
              name="price"
              value={props.formData.price}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={props.formData.category}
            onChange={props.handleChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="KitchenWare">KitchenWare</option>
            <option value="Furnishings">Furnishings</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleSubmit}>
          Submit
        </Button>
        <Button variant="outline-secondary" onClick={props.handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
