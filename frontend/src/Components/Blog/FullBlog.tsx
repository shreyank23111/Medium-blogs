import { Blog } from "../../Hooks";
import { Appbar } from "../Appbar/nav";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">Invalid blog data.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center py-12 px-4 md:px-8 lg:px-12 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-screen-xl">
          <div className="col-span-1 md:col-span-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">{blog.title}</h1>
              <p className="text-slate-500 pt-2">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <p>Details: </p>
            <div className="prose lg:prose-xl text-lg md:text-xl lg:text-2xl break-words overflow-hidden bg-slate-100 p-10 rounded-lg mt-1"
            >
              {blog.content}
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 bg-slate-200 p-5 rounded-lg">
            <div className="text-slate-600 text-lg mb-4">Author</div>
            <div className="flex items-center">
              <Avatar size="big" name={blog.author.firstName} />
              <div className="ml-4">
                <div className="text-lg md:text-xl font-bold">{blog.author.firstName}</div>
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
