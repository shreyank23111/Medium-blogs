import { Link } from 'react-router-dom';

export const  LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8 text-4xl font-bold">Medium's Blogs</div>
      <div className="mb-8 text-1xl">Created by "Shreyank Desai"</div>
      <div className="mb-16">
        <Link to="/signup">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};


