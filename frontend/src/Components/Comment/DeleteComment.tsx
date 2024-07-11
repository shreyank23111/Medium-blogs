import axios from "axios";
import { BACKEND_URL } from "../../config";

interface DeleteParams {
  id: string,
  onDelete: ()=> void;
}

export const DeleteComment = ({id, onDelete}: DeleteParams) => {
  const deleteComment = async()=> {
    try{
      await axios.delete(`${BACKEND_URL}/api/v1/comment/delete-comment/${id}`, {
        headers: {
          Authorization: "Bearer " + (localStorage.getItem("token") || ""),
        },
      })
      onDelete();

    } catch (err) {
      alert("Unable to delete comment");
      console.log("Delete comment Error: ", err);
    }
  } 
  return (
    <button
      onClick={deleteComment}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Delete
    </button>
  );
}