import react from "react"
import {
    Form,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
  } from "react-bootstrap";

export default function ProductForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>ProductID</Form.Label>
            <Form.Control
              type="number"
              placeholder="ProductId"
              name="productId"
              value={props.formData.productId}
              onChange={props.handleChange}
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
              onChange={props.handleChange}
              value={props.formData.quantity}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              // type="number"
              placeholder="Price($)"
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
            <option value="food">Food</option>
            <option value="kitchenware">KitchenWare</option>
            <option value="furnishings">Furnishings</option>
          </Form.Select>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Form>
    )
}