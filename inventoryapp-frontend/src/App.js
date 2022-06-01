import React from 'react'
import SideNav from './components/SideNav'
import InventoryHeader from './components/InventoryHeader';
import InventoryNav from './components/InventoryNav';
import InventoryUtilityBar from './components/InventoryUtilityBar';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';


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
  )
}

export default App;
