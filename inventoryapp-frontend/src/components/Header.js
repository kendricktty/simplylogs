import React from "react";

export default function Header(props) {
  const currentdate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [time, setTime] = React.useState(currentdate.toString().slice(15, 33));

  // setTime(currentdate.toString().slice(15,33))
  //Added clock for fun lmaos
  function refreshClock() {
    setTime(new Date().toString().slice(15, 33));
  }

  React.useEffect(() => {
    const Timer = setInterval(refreshClock, 1000);
    return function clearTimer() {
      clearInterval(Timer);
    };
  }, []);

  return (
    <div className="header">
      <div className="headerLogo">
        <i class="bx bx-package"></i>
        <h4 className="header--name">{props.pageName}</h4>
      </div>
      <h6>{`${currentdate.getDate()}/${
        currentdate.getMonth() + 1
      }/${currentdate.getFullYear()} , ${
        days[currentdate.getDay()]
      }, ${time}`}</h6>
    </div>
  );
}
