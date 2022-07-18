import React from "react";
import { Button, Card, CloseButton } from "react-bootstrap";
import styles from "../../styles/cashier.module.css";

export default function OrderCard(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
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
              <button
                className={styles.cardButton}
                onClick={(event) => props.updateCount(event, props.id, "+")}
              >
                +
              </button>
              <span style={{ marginLeft: "7px" }}>{props.quantity}</span>
              {props.quantity > 1 && <button
                className={styles.cardButton}
                onClick={(event) => props.updateCount(event, props.id, "-")}
              >
                -
              </button>}
              <br />
              Total Price : {formatter.format(props.price * props.quantity)}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
