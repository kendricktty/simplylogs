import React from "react";
import { Button, Card, CloseButton } from "react-bootstrap";
import styles from "../../styles/cashier.module.css";

export default function OrderCard(props) {
  return (
    <div className="col-md-6">
      <Card>
        <Card.Header>
          {props.name}
          <CloseButton
            variant="green"
            className={styles.closeButton}
            onClick={(event) => props.deleteOrder(event, props.id)}
          />
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <div>
              Supplier : {props.supplier}
              <br />
              Price : $ {props.price}
              <br />
              Quantity
              <button className={styles.cardButton}>+</button>
              <span style={{ marginLeft: "7px" }}>{props.quantity}</span>
              <button className={styles.cardButton}>-</button>
              <br />
              Total Price : ${props.price * props.quantity}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
