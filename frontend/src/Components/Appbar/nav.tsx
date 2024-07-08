import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../Blog/BlogCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, isLoggedInSelector } from '../../Store/authState';
import { useEffect } from 'react';

interface AppbarProps {
  openModal?: () => void;
}

export const Appbar = ({ openModal }: AppbarProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const setAuth = useSetRecoilState(authState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  const handleNewClick = () => {
    if (openModal) {
      openModal();
    }
  };

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="border-b flex justify-between px-10 py-3 bg-slate-50">
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div>
        {isLoggedIn && openModal && (
          <button
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleNewClick}
          >
            New
          </button>
        )}
        {isLoggedIn && (
          <>
            <Avatar size={'big'} name="Shreyank" />
            <button
              className="ml-4 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
