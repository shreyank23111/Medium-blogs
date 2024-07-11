import axios from "axios";
import { useState, useEffect } from "react";
import { BlogSkeleton } from "../../Components/Blog/BlogSkeleton";
import { DeleteComment } from "./DeleteComment";
import { useRecoilValue } from "recoil";
import { currentUserSelector } from "../../Store/authState";
import { BACKEND_URL } from "../../config";

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
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const currentUser = useRecoilValue(currentUserSelector);

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  async function fetchComments() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/comment/get-comments`,
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
    } finally {
      setLoading(false);
    }
  }


  if(loading){
    return(
      <div>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
    </div>
    )
  }

 

  return (
    <div className="space-y-4 bg-slate-200 p-5">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-slate-300 rounded-md shadow-md relative">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">- {comment.author.firstName}</p>
            <div className="absolute top-2 right-2">             
                {currentUser && currentUser.id === comment.userId  &&(
                  <div className="absolute right-5 p-3 rounded-md z-20">
                  <DeleteComment id={comment.id} onDelete={fetchComments}/>
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
