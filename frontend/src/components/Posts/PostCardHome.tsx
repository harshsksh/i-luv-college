import { Post } from "@/hooks/Posts/weeklymostupvoted";
import { FC } from "react";
import UpvoteButton from "./UpvoteButton";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className="card bg-base-200 text-base-content hover:shadow-lg duration-500">
      <div className="card-body flex flex-row justify-between items-center gap-3">
        <Link to={`/post/comments/${post.id}`} className="grow">
          <div>
            <h2 className="card-title font-bold mq500:text-lg">
              {post.postTitle}
            </h2>
            <p className="text-sm mt-1">{post.College?.name}</p>
            <div className="flex flex-row items-center mt-5 gap-2">
              {/* Add any additional content here */}
            </div>
          </div>
        </Link>
        <div>
          <UpvoteButton postId={post.id} initialUpvoteLength={post.upvotes} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
