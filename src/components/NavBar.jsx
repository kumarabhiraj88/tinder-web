import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user= useSelector(store=>store.userReducer);
const handleLogout=async()=>{
  try{
    await axios.post(`${BASE_URL}/auth/logout`,{}, {withCredentials: true});
    dispatch(removeUser());
    return navigate("/login");
  }catch(err){
    console.log("Logout error",err);
  }
}

  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Tinder Web</a>
  </div>
  {user && (<div className="flex gap-2">
    <div className="dropdown dropdown-end mx-5 flex ">
      <p className='px-2 my-2'>Welcome, {user?.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default NavBar
