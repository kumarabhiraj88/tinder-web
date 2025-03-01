import axios from 'axios';
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState={
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        photoUrl: '',
        about: ''
    }
    const [formData, setFormData] = useState(initialState);
    const [error, setError]= useState('');


    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSignup=async()=>{
        try{
            const result =await axios.post(`${BASE_URL}/auth/signup`, formData, {withCredentials: true})
            dispatch(addUser(result?.data?.data));
            return navigate("/profile")
        }catch(err){    
            setError(err.message);
        }
    }
        
    
return (
  <div className='flex justify-center my-10'> 
    <div className="card bg-base-100 w-96 shadow-sm">
<div className="card-body">
  <h2 className="card-title">Sign Up</h2>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" name='firstName' onChange={handleChange} value={formData?.firstName} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" name='lastName' onChange={handleChange} value={formData?.lastName} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
      <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
      <input type="email" name='emailId' onChange={handleChange} value={formData?.emailId} placeholder="mail@site.com" required/>
      </label>
  </fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
      <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
      <input type="password" name='password' required onChange={handleChange} value={formData?.password} placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
      </label>
  </fieldset>
  
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Confirm Password</legend>
      <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
      <input type="password" name='confirmPassword' onChange={handleChange} className='' required value={formData?.confirmPassword}  placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
      </label>
  </fieldset>

  <fieldset className="fieldset">
    <legend className="fieldset-legend">Age</legend>
    <input type="number" name='age' value={formData?.age} onChange={handleChange} className="input" placeholder="Type here" min="18" max="70" />
    </fieldset>

    <fieldset className="flex items-center space-x-4">
    <legend className="fieldset-legend">Gender</legend>
    <label className="flex items-center">
        <input type="radio" name="gender" checked={formData?.gender === 'male'} onChange={handleChange} value="male" className="radio-md radio-info" />
        <span className="ml-2">Male</span>
    </label>
    <label className="flex items-center">
        <input type="radio" name="gender" checked={formData?.gender === 'female'} onChange={handleChange} value="female" className="radio-md radio-info" />
        <span className="ml-2">Female</span>
    </label>
    </fieldset>
    
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Photo URL</legend>
    <input type="text" name='photoUrl' value={formData?.photoUrl} onChange={handleChange} className="input" placeholder="Type here" />
    </fieldset>
    
    <fieldset className="fieldset">
    <legend className="fieldset-legend">About</legend>
    <textarea className="textarea h-24" name='about' onChange={handleChange} value={formData?.about} placeholder="About">{formData?.about}</textarea>
    </fieldset>
    <p className="text-red-500"> {error} </p>
  <div className="card-actions justify-end">
    <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
  </div>
  <p>Already have an account? <Link to="/login">Login</Link></p>
</div>
</div>
  </div>
)
}

export default Signup
