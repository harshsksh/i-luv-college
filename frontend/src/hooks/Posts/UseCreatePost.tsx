import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const UseCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const createPost = async (
    title: string,
    description: string,
    collegeId: string
  ) => {
    setLoading(true);
    toast.loading("Creating post..."); // Show loading toast
    try {
      const res = await fetch(`/api/posts/addnew`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postTitle: title,
          postDescription: description,
          collegeId,
          userId: authUser?.id,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.dismiss(); // Dismiss loading toast
      toast.success("Post created successfully!"); // Show success toast
    } catch (error: any) {
      console.error("Error in UseCreatePost hook ", error.message);
      toast.dismiss(); // Dismiss loading toast
      toast.error(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return { loading, createPost };
};

export default UseCreatePost;
