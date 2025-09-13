import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type Comment = {
  content: string;
  createdAt: string;
  user: {
    username: string;
    profilePicLink: string;
  };
};

export type SinglePost = {
  id: string;
  postTitle: string;
  postDescription: string;
  createdAt: string;
  username: string;
  profilePicLink: string;
  collegeName: string;
  collegeId: string;
  upvotes: number;
  comments: Comment[];
};

const UseGetSinglePost = ({ postId }: { postId: string }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<SinglePost>();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/posts/single/${postId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setPost(data);
      } catch (error: any) {
        console.error("Error in UseGetSinglePost hook ");
        toast.error(error);
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, []);

  return { loading, post };
};

export default UseGetSinglePost;
