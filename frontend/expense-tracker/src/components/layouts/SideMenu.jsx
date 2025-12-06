import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);  
  
  const navigate = useNavigate();

  const clickHandler = (route) => {
    if(route === "Logout"){
      logoutHandler();
      return
    }
    navigate(route);
  }

  const logoutHandler = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  }
  

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white shadow-md p-6 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl || ""} alt="Profile image" className='w-25 h-25 bg-slate-400 rounded-full' />
        ): <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl" />}

        <h5 className='text-gray-950 font-medium leading-6'>{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((menu, index) => (
        <button key={`side-menu-${index}`} className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === menu.label ? 'text-white bg-primary' : ''} py-3 px-6 rounded-lg mb-3 cursor-pointer`} onClick={() => clickHandler(menu.path)}>
          <menu.icon className="text-xl"/>
          {menu.label}
          </button>
      ))}
    </div>
  )
}

export default SideMenu