import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Cashier from "./pages/Cashier";
import ProtectedRoute from "./pages/ProtectedRoute"
import Error from "./pages/Error"



function App() {
  const [user, setUser] = React.useState(localStorage.getItem("user"))
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/" element={
        <ProtectedRoute user={user}>
          <Outlet />
        </ProtectedRoute>}>
          <Route index element={<Dashboard setUser={setUser} user={user}/>} />
          <Route exact path="/inventory" element={<Inventory user={user} setUser={setUser}/>} />
          <Route exact path="/sales" element={<Sales user={user} setUser={setUser}/>} />
          <Route exact path="/cashier" element={<Cashier user={user} setUser={setUser}/>} />
          <Route path="*" element={<Error />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
