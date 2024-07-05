import { Blog } from "../../Hooks";
import { Appbar } from "../Appbar/nav";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center py-12">
        <div className="grid grid-cols-12 gap-8 w-full max-w-screen-xl px-4">
          <div className="col-span-8">
            <div className="mb-6">
              <h1 className="text-5xl font-extrabold">{blog.title}</h1>
              <p className="text-slate-500 pt-2">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <div className="prose lg:prose-xl text-2xl">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg mb-4">Author</div>
            <div className="flex items-center">
              <Avatar size="big" name={blog.author.firstName} />
              <div className="ml-4">
                <div className="text-xl font-bold">{blog.author.firstName}</div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
