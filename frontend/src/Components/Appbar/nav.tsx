import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../Blog/BlogCard';
import { useRecoilValue } from 'recoil';
import {  currentUserSelector, isLoggedInSelector } from '../../Store/authState';
import { useEffect, useState } from 'react';


export const Appbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useRecoilValue(currentUserSelector);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };



  useEffect(() => {
  }, [isLoggedIn]);

   return (
    <div className="border-b flex justify-between px-4 md:px-10 py-3 bg-nav">
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-white">
        Medium Blogs
      </Link>
      <div className="flex items-center">
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {showMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {isLoggedIn && (
          <div className={`md:flex ${showMenu ? 'block' : 'hidden'} md:items-center md:space-x-4 mt-4 md:mt-0`}>
            <Avatar size={'big'} name={currentUser} />
            <button
              className="ml-4 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
