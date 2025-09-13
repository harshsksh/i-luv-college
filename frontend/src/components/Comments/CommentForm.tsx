import { useAuthContext } from "@/contexts/useAuthContext";
import UseAddComment from "@/hooks/Comments/UseAddComment";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CommentForm = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");
  const { loading, AddComment } = UseAddComment(postId);
  const { authUser } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        await AddComment(content);
        setContent(""); // Clear the form after submission
      } catch (error) {
        console.error("Error adding comment:", error);
        // You might want to display an error notification to the user here
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="form-control">
        <label className="text-sm font-medium text-gray-500" htmlFor="comment">
          Leave a Comment
        </label>
        <textarea
          id="comment"
          className="textarea textarea-bordered w-full"
          placeholder="A funny comment will be appreciated"
          value={content}
          rows={2}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={loading || !authUser}
        />
      </div>
      {authUser ? (
        content && (
          <div className="form-control mt-4">
            <button
              type="submit"
              className={`btn btn-primary ${
                loading ? "loading" : "animate-pop"
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Comment"}
            </button>
          </div>
        )
      ) : (
        <div className="form-control mt-4">
          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-primary animate-pop w-full"
            >
              Post a Comment
            </button>
          </Link>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
