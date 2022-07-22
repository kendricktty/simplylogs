import styles from "../styles/error.module.css";
import React from "react";

export default function Error() {
  return (
    <div className={"container-fluid" + " " + styles.background}>
      <div className="row text-center">
        <form action="/register">
          <h2 className={styles.error}>Error 404</h2>
          <p className={styles.textBody}>Please Redirect to our Main Page</p>
          <div className={"col-12 text-center" + " " + styles.gif}></div>
          <button className={styles.button} type="submit">
            Return Back to HomePage
          </button>
        </form>
      </div>
    </div>
  );
}
