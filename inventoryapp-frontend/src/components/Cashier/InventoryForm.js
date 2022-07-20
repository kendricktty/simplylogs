import {
  Form,
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import React from "react";

export default function InventoryForm(props) {
  const [show, setShow] = React.useState(true);
  const handleClose = () => props.setForm(false);
  const [formData, setFormData] = React.useState({
    productId: "",    "material-table": "^2.0.3",
    quantity: 1,
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevdata) => ({
      ...prevdata,
      [name]: parseInt(value),
    }));
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Id"
                value={formData.productId}
                onChange={handleChange}
                name="productId"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                name="quantity"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                handleClose();
                props.addOrder(formData);
              }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              props.addOrder(formData);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
