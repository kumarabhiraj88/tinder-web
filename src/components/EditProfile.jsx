import React,{ useEffect, useState} from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Toast from './common/Toast';
import PropTypes from 'prop-types';

const EditProfile = ({user}) => {
    const dispatch = useDispatch();

      const [firstName, setFirstName]= useState(user?.firstName);
      const [lastName, setLastName]= useState(user?.lastName);
      const [age, setAge]= useState(user?.age);
      const [gender, setGender]= useState(user?.gender);
      const [photoUrl, setPhotoUrl]= useState(user?.photoUrl);
      const [about, setAbout]= useState(user?.about);
      const [showToast, setShowToast]= useState(false);
      const [error, setError]= useState('');

      const saveProfile = async()=>{
        setError("");
        try{
            const result = await axios.patch(`${BASE_URL}/profile/edit`,
                {
                    firstName, lastName, age, gender, photoUrl, about
                }
                );

            //updating the new user data to store
            dispatch(addUser(result?.data?.data));
            setShowToast(true);

        }catch(err){    
            setError(err.message);
        }
      }

      useEffect(()=>{
        let timerId;
        if(showToast){
            timerId= setTimeout(()=>{
                setShowToast(false);
            },3000);
        }
        //cleanup function to clear the timout while unmount
        return ()=> clearTimeout(timerId);
      },[showToast]);
  return (
    <>
    <div className='flex justify-center my-10'>
    <div className='flex justify-center'> 
      <div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>

    <fieldset className="fieldset">
    <legend className="fieldset-legend">First Name</legend>
    <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input" placeholder="Type here" />
    </fieldset>

    <fieldset className="fieldset">
    <legend className="fieldset-legend">Last Name</legend>
    <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input" placeholder="Type here" />
    </fieldset>

    <fieldset className="fieldset">
    <legend className="fieldset-legend">Age</legend>
    <input type="number" name='age' value={age} onChange={(e)=>setAge(e.target.value)} className="input" placeholder="Type here" min="18" max="70" />
    </fieldset>

    <fieldset className="flex items-center space-x-4">
    <legend className="fieldset-legend">Gender</legend>
    <label className="flex items-center">
        <input type="radio" name="gender" checked={gender === 'male'} onChange={(e)=>setGender(e.target.value)} value="male" className="radio-md radio-info" />
        <span className="ml-2">Male</span>
    </label>
    <label className="flex items-center">
        <input type="radio" name="gender" checked={gender === 'female'} onChange={(e)=>setGender(e.target.value)} value="female" className="radio-md radio-info" />
        <span className="ml-2">Female</span>
    </label>
    </fieldset>
    
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Photo URL</legend>
    <input type="text" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} name="photoUrl" className="input" placeholder="Type here" />
    </fieldset>
    
    <fieldset className="fieldset">
    <legend className="fieldset-legend">About</legend>
    <textarea className="textarea h-24" value={about} name={about} onChange={(e)=>setAbout(e.target.value)} placeholder="About" />
    </fieldset>

<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={user} edit={true} />
    </div>
    {showToast &&<Toast msg={"Profile updated successfully"} />}
    </>
  )
}

EditProfile.propTypes={
  user:PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
  })
}
export default EditProfile
