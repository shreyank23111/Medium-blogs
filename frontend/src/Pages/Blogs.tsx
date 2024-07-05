import { Appbar } from "../Components/Appbar/nav";
import { useBlogs } from "../Hooks";
import { BlogSkeleton } from "../Components/Blog/BlogSkeleton";
import { BlogCard } from "../Components/Blog/BlogCard";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id} // Ensure unique key
                id={blog.id}
                authorName={blog.author?.firstName || "Shreyank"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedAt}
              />
            ))
          ) : (
            <div>No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
};
