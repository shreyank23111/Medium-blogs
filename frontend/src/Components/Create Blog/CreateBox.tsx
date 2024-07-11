import { useState } from "react";
import { CreateBlog } from "./CreateBlog";


interface CreateBoxProps {
  fetchBlog: () => void;
}

export const CreateBox = ({ fetchBlog }: CreateBoxProps) => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  const handleBlogCreated = () => {
    fetchBlog();
    setShowCreateBlog(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-3 px-4 py-6 bg-slate-800  rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Write fearlessly...</h2>
        <button
          className="bg-red-500 px-4 py-3 rounded-md text-white"
          onClick={() => setShowCreateBlog(true)}
        >
          New Blog
        </button>
      </div>
      {showCreateBlog && <CreateBlog onCreate={handleBlogCreated} onHide={() => setShowCreateBlog(false)} />}
    </div>
  );
};
