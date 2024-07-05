import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


export interface Blog {
  content: string;
  title: string;
  id: string;
  publishedAt: string;
  author: {
    firstName: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/get-blog/${id}`, {
          headers: {
            Authorization: "Bearer " + (localStorage.getItem("token") || ""),
          },
        });
        setBlog(response.data.message.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
  };
};


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk-posts`, {
          headers: {
            Authorization: "Bearer " + (localStorage.getItem("token") || ''),
          },
        });
        
        if (response.data && response.data.blogs) {
          setBlogs(response.data.blogs);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};
