import { Comment } from "@/hooks/Posts/UseGetSinglePost";
import CommentCard from "@/components/Comments/CommentCard";

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.createdAt} comment={comment} />
        ))
      ) : (
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">No comments yet!</h2>
            <p>
              Be the first one to leave a comment on this post. Make sure it's
              funny ;)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
