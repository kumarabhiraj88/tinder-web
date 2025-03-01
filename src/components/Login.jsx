import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  
  const [emailId, setEmailId]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin=async()=>{
    try{
      const result= await axios.post(`${BASE_URL}/auth/login`, {emailId, password},{withCredentials: true});

      dispatch(addUser(result.data));
      navigate("/");
    }catch(err){
      setError(err.response.data || "Something went wrong");
    }    
  }

  return (
    <div className='flex justify-center my-10'> 
      <div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <div>
      <div className='mb-2'>
      <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  <input type="email" onChange={(e)=>setEmailId(e.target.value)} value={emailId} placeholder="Enter Email ID" required/>
</label>
<div className="validator-hint hidden">Enter valid email address</div>
      </div>
      <div>
      <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required placeholder="Enter Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
</label>
<p className="text-red-500"> {error} </p>
      </div>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
  </div>
</div>
    </div>
  )
}

export default Login
