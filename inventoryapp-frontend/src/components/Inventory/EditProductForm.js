import React from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
} from "react-bootstrap";

export default function EditProductForm(props) {
  const handleClose = () => props.setShowEditProduct(false);

  return (
    <>
      <Modal show={props.showEditProduct} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>ProductID</Form.Label>
              <Form.Control
                type="number"
                placeholder="ProductId"
                name="productId"
                min={0}
                value={props.editFormParam.productId}
                onChange={props.handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                value={props.editFormParam.productName}
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Supplier"
                name="supplier"
                value={props.editFormParam.supplier}
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
                value={props.editFormParam.quantity}
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price($)"
                name="price"
                min={0}
                step={0.01}
                value={props.editFormParam.price}
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={props.editFormParam.category}
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
