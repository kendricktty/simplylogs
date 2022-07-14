import React from "react";
import styles from "../styles/login.module.css";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router";
import "animate.css";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import axios from "../axios/axios";
const initialState = {
  name: "",
  email: "",
  password: "",
  company: "",
  isMember: true,
};

export default function Login(props) {
  const navigate = useNavigate();
  const [values, setValues] = React.useState(initialState);

  async function handleLogin() {
    try {
      const res = await axios.post("/auth/login", values);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      props.setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  async function handleRegister() {
    try {
      const res = await axios.post("/auth/register", values);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      props.setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

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
            <h1
              className={
                styles.logo +
                " " +
                "mt-3" +
                " " +
                " animate__animated animate__bounce"
              }
            >
              SIMPLY LOGS
            </h1>
            <img
              src="../../logo.jpg"
              style={{ width: "125px", height: "auto" }}
            />
          </div>
          <div className={styles.loginForm + " " + "mx-4 mt-3"}>
            {values.isMember ? (
              <LoginForm
                values={values}
                setValues={setValues}
                toggleMember={toggleMember}
                handleChange={handleChange}
                handleLogin={handleLogin}
              />
            ) : (
              <RegisterForm
                values={values}
                setValues={setValues}
                toggleMember={toggleMember}
                handleChange={handleChange}
                handleRegister={handleRegister}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
