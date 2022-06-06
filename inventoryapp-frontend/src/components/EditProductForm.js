import react from 'react'
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
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ProductID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ProductId"
                  name="productId"
                  value={123}
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