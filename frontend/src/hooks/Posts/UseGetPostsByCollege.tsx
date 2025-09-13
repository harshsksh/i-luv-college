import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type User = {
  username: string;
};

type Comment = { content: string };

export type Post = {
  id: string;
  createdAt: Date;
  postTitle: string;
  postDescription: string;
  upvotes: number;
  User: User;
  comments: Comment[];
};
const UseGetPostsByCollege = (collegeId: string) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/posts/college/${collegeId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setPosts(data);
      } catch (error: any) {
        console.error("Error in UseGetPostsByCollege hook ");

        toast.error(error);
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return { loading, posts };
};

export default UseGetPostsByCollege;
