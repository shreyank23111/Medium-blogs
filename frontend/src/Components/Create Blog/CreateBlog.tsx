import { useState } from "react";
import axios from "axios";
import { BlogInputs } from "./BlogInputs";
import { CreateBlogInput } from "@shreyank23/medium-common";
import { BACKEND_URL } from "../../config";

interface CreateBlogProps {
  onCreate: () => void;
  onHide: () => void;
}

export const CreateBlog = ({ onCreate, onHide }: CreateBlogProps) => {
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
      onCreate();
      onHide();
    } catch (err) {
      alert("Unable to create blog");
      console.error("Create blog Error: ", err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-slate-700 rounded-lg border border-white">
      <div className="w-full mb-4">
        <BlogInputs
          label="Title"
          placeholder="Enter a short crisp title"
          onChange={(e) => setUserInputs({ ...userInputs, title: e.target.value })}
        />
      </div>
      <div className="w-full mb-4">
        <BlogInputs
          label="Content"
          placeholder="Enter detailed information"
          onChange={(e) => setUserInputs({ ...userInputs, content: e.target.value })}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={sendRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
        <button
          onClick={onHide}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
