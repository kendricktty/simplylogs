import styles from "../../styles/login.module.css";

import "animate.css";

import React from "react";
export default function RegisterForm(props) {
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
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Name" />
          </div>

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
                <i class="fa-solid fa-building"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Company" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.setAccount(true);
            }}
            className={styles.loginButton}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
