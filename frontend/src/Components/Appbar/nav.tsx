import { Link } from "react-router-dom";
import { Avatar } from "../Blog/BlogCard";

interface AppbarProps {
  openModal?: () => void;
}

export const Appbar = ({ openModal }: AppbarProps) => {
  const handleNewClick = () => {
    console.log("New button clicked");
    if (openModal) {
      openModal();
    }
  };

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div>
        <button 
          className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleNewClick}
        >
          New
        </button>
        <Avatar size={"big"} name="Shreyank" />
      </div>
    </div>
  );
};
