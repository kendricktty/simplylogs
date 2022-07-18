import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Cashier from "./pages/Cashier";
<<<<<<< HEAD
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
=======
import ProtectedRoute from "./pages/ProtectedRoute"
import Error from "./pages/Error"


>>>>>>> ceb853d167c93e79a609a9e5bf8d0217327af2af

function App() {
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/register"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard setUser={setUser} user={user} />} />
          <Route
            exact
            path="/inventory"
            element={<Inventory user={user} setUser={setUser} />}
          />
          <Route
            exact
            path="/sales"
            element={<Sales user={user} setUser={setUser} />}
          />
          <Route
            exact
            path="/cashier"
            element={<Cashier user={user} setUser={setUser} />}
          />
          <Route exact path="*" element={<Error />} />
=======
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
>>>>>>> ceb853d167c93e79a609a9e5bf8d0217327af2af
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
