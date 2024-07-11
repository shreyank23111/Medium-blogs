import { CreateCommentInput } from "@shreyank23/medium-common"
import axios from "axios";
import { useState } from "react"
// import { BACKEND_URL } from "../../config";
// import { useParams } from "react-router-dom";

interface RouteParams {
  postId: string;
 onCommentAdded: () => void;
}

export const CreateComment = ({postId, onCommentAdded}: RouteParams) => {
  // const {postId} = useParams();
  const [comment, setComment] = useState<CreateCommentInput>({
    content: ""
});

  async function sendRequest() {
    try{
      await axios.post(`http://127.0.0.1:8787/api/v1/comment/write-comment`, 
        {
          content: comment.content, 
          postId: postId,
        },
        {
          headers: {
            Authorization: "Bearer " + (localStorage.getItem("token") || "")
          }
        }
      );
      onCommentAdded()

      // console.log();
      
      // console.log(response.data);
      

    } catch (err) {
      alert("Unable to create blog");
      console.log("Create blog Error: ", err);
     
      
  }
}

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 p-4 bg-slate-100 rounded-md shadow-md">
    <input
      type="text"
      placeholder="Write your comment here..."
      value={comment.content}
      onChange={(e) =>
        setComment({
          ...comment,
          content: e.target.value
        })
      }
      className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={sendRequest}
      className="px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Comment
    </button>
  </div>
    
  )
}