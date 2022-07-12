import styles from "../../styles/login.module.css";

import "animate.css";

import React from "react";
export default function LoginForm(props) {
  return (
    <div className={styles.formBox}>
      <div className={styles.headerForm + " " + "mt-4"}>
        <h4 className="text-primary text-center"></h4>
        <div className="image"></div>
      </div>
      <div className="body-form">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa-solid fa-at"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Email" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="button" className={styles.loginButton}>
            LOGIN
          </button>
          <div className="message">
            <div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  props.setAccount(false);
                }}
              >
                Sign Up a New Account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
