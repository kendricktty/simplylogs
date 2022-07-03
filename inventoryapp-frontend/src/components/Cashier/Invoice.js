import React from "react";
import styles from "../../styles/cashier.module.css";

export default function Invoice(props) {
  props.setRef(props.ref);
  return (
    <div>
      <div>I will not be in the PDF.</div>
      <div ref={props.ref}>I will be in the PDF</div>
    </div>
  );
}
