import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user= useSelector(store=>store.userReducer);
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
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default NavBar
