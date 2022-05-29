import React from "react";
import styles from "../styles/login.module.css";

export default function Login() {
  return (
    <div className={"container-fluid" + " " + styles.login}>
      <h2 className="text-center">Welcome to Inventory App</h2>
      <div
        className={"container align-self-center gy-4 mt-5" + " " + styles.form}
      >
        <div className="row d-flex justify-content-center">
          <div className="col-4 text-center">
            <img
              className="img-fluid"
              src="../../logo192.png"
              width="30%"
              height="auto"
            ></img>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-6 px-3">
              Login:
              <input type="text" className="form-control"></input>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6 ">
                Password:
                <input type="password" className="form-control "></input>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-4 text-center">
                  <button type="button " className="btn btn-success mt-3 ">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="/dashboard"
                    >
                      Login
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
