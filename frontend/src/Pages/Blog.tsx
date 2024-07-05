import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks";
import { Appbar } from "../Components/Appbar/nav";
import { Spinner } from "../Components/Spinner";
import { FullBlog } from "../Components/Blog/FullBlog";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "No id" });

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
