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
      <div className="p-4 rounded-md #ffd60a bg-customBlue border border-slate-900">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="pl-2 flex items-center">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-lg font-thin break-words overflow-hidden">
          {(content?.slice(0, 100) || "") + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(content?.length / 100) || ""} minute read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

interface User {
  id: string;
  firstName: string;
}

type AvatarProps = {
  name: string | null | undefined | User;
  size?: "small" | "big";
};

export function Avatar({ name, size = "small" }: AvatarProps) {
  let initials = '';

  if (typeof name === 'string') {
    initials = name[0];
  } else if (name && typeof name === 'object') {
    initials = name.firstName[0]; // Adjust as per your User interface
  }
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className={`${size === "small" ? "text-xs" : "text-md"}  text-white`}>
         {initials.toUpperCase()}
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
