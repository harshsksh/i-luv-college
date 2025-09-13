import { Comment } from "@/hooks/Posts/UseGetSinglePost";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="card bg-base-200 text-base-content">
      <div className="card-body p-5">
        <p style={{ whiteSpace: "pre-line" }}>{comment.content}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="avatar">
            <div className="w-6 h-6 rounded-full">
              <img
                src={comment.user.profilePicLink}
                alt={`${comment.user.username}'s profile picture`}
                width="24"
                height="24"
                title="User Profile Picture"
                loading="lazy"
              />
            </div>
          </div>
          <div>{comment.user.username}</div>
          <div> • </div>
          <div>{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
