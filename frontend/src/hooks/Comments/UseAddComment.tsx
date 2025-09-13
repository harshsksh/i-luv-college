import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const UseAddComment = (postId: string) => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const AddComment = async (content: string) => {
    setLoading(true);
    toast.loading("Adding Comment..."); // Show loading toast
    try {
      const res = await fetch(`/api/posts/comment/addnew/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          userId: authUser?.id,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.dismiss(); // Dismiss loading toast
      toast.success("Comment added successfully!"); // Show success toast
      window.location.reload(); // Refresh the page to show the new comment
    } catch (error: any) {
      console.error("Error in UseAddComment hook ", error.message);
      toast.dismiss(); // Dismiss loading toast
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, AddComment };
};

export default UseAddComment;
