import React from "react";
import styles from "../../styles/cashier.module.css";

export default function Invoice(props) {
  return (
    <div>
      <div>I will not be in the PDF.</div>
      <div ref={props.ref} styles={{ display: "" }}>
        I will be in the PDF.
        {props.order.map((order) => (
          <div>{order.productId}</div>
        ))}
      </div>
    </div>
  );
}
