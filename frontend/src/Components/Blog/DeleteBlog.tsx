import axios from "axios"
import { useCallback } from "react";
import { useNavigate } from "react-router-dom"

interface RouteParams {
  id: string
}

export const DeleteBlog = ({id}: RouteParams) => {
  const navigate = useNavigate();
 
  const handleDelete = useCallback(async ()=> {
    try{
      await axios.delete(`http://localhost:8787/api/v1/blogs/delete-post/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      navigate("/blogs");

    } catch (err) {
      alert("Unable to delete blog");
      console.log("Delete blog Error: ", err);
    }
  }, [id, navigate])

  return(
    <div>
      <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
    </div>
  )
}