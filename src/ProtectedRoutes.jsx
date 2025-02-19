import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {
  const user= useSelector(store=>store.userReducer);
  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
