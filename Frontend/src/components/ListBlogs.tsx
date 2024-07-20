import { useEffect, useState } from "react";
import axios from "axios";
import {Blog} from "./Blog"; // Assuming Blog component is imported correctly

// Define the type for the blog objects
interface BlogType {
  _id: string;
  title: string;
  description: string;
}

function ListBlogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:10000/post/list");
        console.log(response);
        setBlogs(response.data.list);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center gap-8 py-20">
      {blogs.map((blog) => (
        <Blog key={blog._id} title={blog.title} description={blog.description} />
      ))}
    </div>
  );
}

export default ListBlogs;
