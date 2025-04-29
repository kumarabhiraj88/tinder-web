import React, {useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import Login from './Login';


const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData = useSelector((store) => store.user);
  
  const fetchUser=async()=>{
    try{
      const result= await axios.get(`${BASE_URL}/profile/view`,{
        withCredentials: true
      });
      console.log('api result',result?.data);
      dispatch(addUser(result?.data))
    }catch(err){
      if(err.status===401){
        navigate("/login");
      }
      console.log("Profile error",err);
    }
    
  }

  useEffect(()=>{
    //This token suggests the user might already be authenticated 
    const token = localStorage.getItem("token");
    if(token && !userData){
      fetchUser();
    }
    
  },[])

const isUserEmpty= Object.keys(userData).length===0;
const showLogin= isUserEmpty && (location.pathname === '/' || location.pathname === '/login')
  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
      {showLogin ? <Login />: <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default Body
