import { Post } from "@/hooks/Posts/UseGetPostsByCollege";
import { FC } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import UpvoteButton from "./UpvoteButton";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  // Limit the post description to 400 characters
  const truncatedDescription =
    post.postDescription.length > 200
      ? post.postDescription.slice(0, 200) + "..."
      : post.postDescription;

  return (
    <div className="card bg-base-100 hover:shadow-lg duration-500">
      <div className="card-body flex flex-row justify-between items-center gap-3">
        <Link to={`/post/comments/${post.id}`} className="grow">
          <div>
            <h2 className="card-title font-bold mq500:text-lg">
              {post.postTitle}
            </h2>
            {/* Display truncated description */}
            <p className="text-sm text-gray-500 mt-1">{truncatedDescription}</p>
            <div className="flex flex-row items-center mt-5 gap-2">
              <FaRegCommentAlt className="text-gray-500" />
              <div className="">{post.comments.length}</div>
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
