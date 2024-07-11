import axios from "axios";
import { useState, useEffect } from "react";

interface RouteParams {
  postId: string;
  refresh: boolean;
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
  author: {
    firstName: string;
  };
}

export const DisplayComment = ({ postId, refresh }: RouteParams) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  async function fetchComments() {
  
    
    try {
      const response = await axios.get(
        `http://127.0.0.1:8787/api/v1/comment/get-comments`,
        {
          params: { postId },
          headers: {
            Authorization: "Bearer " + (localStorage.getItem("token") || "")
          }
        }
      );
      if (response.data.comment) {
        setComments(response.data.comment);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments: ", err);
      setComments([]);
    }
  }

  async function updateComment(id: string, content: string) {
    // console.log(id);
    
    try {
      // console.log(id);
      const response = await axios.put(
        `http://127.0.0.1:8787/api/v1/comment/update-comment/${id}`,
        { content },
        {
          headers: {
            Authorization: "Bearer " + (localStorage.getItem("token") || "")
          }
        }
      );
      setComments(comments.map(comment => (comment.id === id ? response.data.comment : comment)));
    } catch (err) {
      // console.log(id);
      console.error("Update comment error: ", err);
    }
  }

  return (
    <div className="space-y-4 bg-slate-200 p-5">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-white rounded-md shadow-md relative">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">- {comment.author.firstName}</p>
            <div className="absolute top-2 right-2">
              <button onClick={() => setShowMenu(comment.id)}>
                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7a2 2 0 110-4 2 2 0 010 4zm0 5a2 2 0 110-4 2 2 0 010 4zm0 5a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {showMenu === comment.id && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-20">
                  <button
                    onClick={() => {
                      const newContent = prompt("Update comment", comment.content);
                      if (newContent) {
                        updateComment(comment.id, newContent);
                      }
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Update
                  </button>
                  <button
                    // onClick={() => deleteComment(comment.id)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No Comments Available</div>
      )}
    </div>
  );
};
