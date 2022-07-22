import styles from "../../styles/login.module.css";

import "animate.css";

import React from "react";
export default function LoginForm(props) {
  return (
    <div className={styles.formBox}>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
      <div className={styles.headerForm + " " + "mt-4"}>
        <h4 className="text-primary text-center"></h4>
        <div className="image"></div>
      </div>
      <div className="body-form">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span class="material-symbols-outlined">
                  mail
                </span>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Email" name="email" value={props.values.email} onChange={(e) => props.handleChange(e)} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span class="material-symbols-outlined">
                  password
                </span>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={props.values.password}
              onChange={(e) => props.handleChange(e)}
            />
          </div>
          <button type="button" className={styles.loginButton} onClick={() => props.handleLogin()}>
            LOGIN
          </button>
          <div className="message">
            <div>
              <a
                className={styles.signUp}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  props.toggleMember()
                }}
              >
                New user? Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
