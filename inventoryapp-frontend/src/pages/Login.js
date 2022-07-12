import React from "react";
import styles from "../styles/login.module.css";
import Carousel from "react-bootstrap/Carousel";

export default function Login() {
  return (
    <div className={"container-fluid" + " " + styles.login}>
      <div className={"row" + " " + styles.login}>
        <div className={"col-md-6" + " " + styles.leftSide}>
          <Carousel
            controls={false}
            indicators={false}
            interval={2000}
            className="mt-5"
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../undraw_finance_re.svg"
                alt="First slide"
              />

              <h3 className={styles.carousellItem}>Accounting</h3>
              <p className={styles.carousellItem}>Need Help With Accounting?</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../undraw_logistics.svg"
                alt="Second Slide"
              />

              <h3 className={styles.carousellItem}>Logistics</h3>
              <p className={styles.carousellItem}>Need Help With Logisitcs?</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../undraw_term_sheet.svg"
                alt="Third Slide"
              />

              <h3 className={styles.carousellItem}>Workflow Management</h3>
              <p className={styles.carousellItem}>
                Need Help with streamlining your workflow proccesses?
              </p>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={"col-md-6" + " " + styles.rightSide}>
          <div>
            <h1 className={styles.logo + " " + "mt-3"}>SIMPLY LOGS</h1>
            <img
              src="../../logo.jpg"
              style={{ width: "125px", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
