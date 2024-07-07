import { Appbar } from "../Components/Appbar/nav"
import { CreateBlog } from "../Components/Create Blog/CreateBlog"

export const Publish = () => {
  return <div>
    <Appbar/>
    <div className="flex justify-center w-full pt-8">
      <CreateBlog/>
    </div>
  </div>
}
