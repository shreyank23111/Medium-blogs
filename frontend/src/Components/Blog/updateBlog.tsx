import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../../config";
import { UpdateBlogInput } from "@shreyank23/medium-common";

interface updateBlogData {
  onSave: ()=> void;
}

export const UpdateBlog = ({onSave}: updateBlogData) => {
  const [userInputs, setUserInputs] = useState<UpdateBlogInput>({
    title: "",
    content: "",
    id: ""
  });

  const updateBlog = async() => {
    try{
      await axios.put(`${BACKEND_URL}/api/v1/blogs/update-blog`, {
        userInputs
      }, {
        headers: {
          Authorization: "Bearer " + (localStorage.getItem("token") || "")
        }
      })
      onSave();
    } catch(err) {
      alert("Unable to update blog");
      console.log("Update blog Error: ", err);
    }
  }

  return(
    <div>
      <div className="col-span-1 md:col-span-8">
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
      <input type="text"
      value={userInputs.title}
      onChange={(e)=> setUserInputs({...userInputs, title: e.target.value})}
      className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-slate-50"
      />
      </h1>
      {/* <p className="text-slate-500 pt-2">{new Date(blog.publishedAt).toLocaleDateString()}</p> */}
    </div>
    <p>Details: </p>
    <div className="prose lg:prose-xl text-lg md:text-xl lg:text-2xl break-words overflow-hidden bg-slate-100 p-10 rounded-lg mt-1"
    >
      <input type="text"
      value={userInputs.content}
      onChange={(e)=> setUserInputs({...userInputs, content: e.target.value})}
      className="bg-slate-100"
      />
      {/* {blog.content} */}
    </div>
  </div>
  <button
  onClick={updateBlog}
  >Save</button>
    </div>
        
  )
}