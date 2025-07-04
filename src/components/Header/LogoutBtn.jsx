import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 text-white font-medium rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;