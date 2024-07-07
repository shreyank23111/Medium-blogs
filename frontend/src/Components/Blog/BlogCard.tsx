import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blogs/get-blog/${id}`} className="w-full sm:w-1/2 lg:w-1/3 p-2">
      <div className="p-4 border border-slate-200 rounded-md bg-slate-100">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="pl-2 flex items-center">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin break-words overflow-hidden">
          {(content?.slice(0, 100) || "") + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(content?.length / 1000) || ""} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}

// // Parent Component
// const BlogList = ({ blogs }: { blogs: BlogCardProps[] }) => {
//   return (
//     <div className="flex flex-wrap -mx-2">
//       {blogs.map((blog) => (
//         <BlogCard
//           key={blog.id}
//           id={blog.id}
//           authorName={blog.authorName}
//           title={blog.title}
//           content={blog.content}
//           publishedDate={blog.publishedDate}
//         />
//       ))}
//     </div>
//   );
// };

// export default BlogList;
