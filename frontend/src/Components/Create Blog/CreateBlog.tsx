import { CreateBlogInput } from "@shreyank23/medium-common";
import { useState } from "react";
import axios from "axios";
import { BlogInputs } from "./BlogInputs";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

interface CreateBlogProps {
  onClose: () => void; 
}


export const CreateBlog = ({onClose}: CreateBlogProps) => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<CreateBlogInput>({
    title: "",
    content: ""
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blogs/create-blog`, userInputs, {
        headers: {
          Authorization: "Bearer " + (localStorage.getItem("token") || ""),
        }
      });
      console.log(response.data);
      onClose();
      navigate("/blogs");
    } catch (err) {
      alert("Unable to create blog");
      console.log("Create blog Error: ", err);
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-100 p-6 border rounded-lg w-full">
      <div className="mb-4 w-full">
        <BlogInputs
          label="Title"
          placeholder="a short crisp title"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              title: e.target.value
            });
          }}
        />
      </div>
      <div className="mb-4 w-full">
        <BlogInputs
          label="Content"
          placeholder="detail info"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              content: e.target.value
            });
          }}
        />
      </div>
      <div className="mb-4 w-full flex justify-end">
        <button
          onClick={sendRequest}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
      </div>
    </div>
  );
};
