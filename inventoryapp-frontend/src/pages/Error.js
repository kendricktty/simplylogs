import styles from "../styles/error.module.css";
<<<<<<< HEAD
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
=======
import React from 'react'

export default function Error() {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <a href="/" class="link_404">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
>>>>>>> ceb853d167c93e79a609a9e5bf8d0217327af2af
      </div>
    </div>
  );
}
