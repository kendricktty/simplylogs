import React from 'react'
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, user }) => {

    console.log(user);
    return !user ? <Navigate to='/register' /> : children
}

export default ProtectedRoute