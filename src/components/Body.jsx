import React, { use, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';



const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData = useSelector((store) => store.userReducer);
  
  const fetchUser=async()=>{
    try{
      const result= await axios.get(`${BASE_URL}/profile/view`,{
        withCredentials: true
      });
      dispatch(addUser(result?.data))
    }catch(err){
      if(err.status===401){
        navigate("/login");
      }
      console.log("Profile error",err);
    }
    
  }

  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
    
  },[])
  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
