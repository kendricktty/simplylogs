<<<<<<< HEAD
import React from 'react'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';

=======
import React from "react";
import SideNav from "./components/SideNav";
import InventoryHeader from "./components/Header";
import InventoryNav from "./components/Inventory/InventoryNav";
import InventoryUtilityBar from "./components/Inventory/InventoryUtilityBar";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
>>>>>>> 8750b421a5170b1b1405a3f060bb951e4e958fe6

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
