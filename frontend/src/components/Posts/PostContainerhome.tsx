import { FC } from "react";
import PostCard from "./PostCardHome";
import useWeeklyMostUpvoted from "@/hooks/Posts/weeklymostupvoted";
import PostSkeleton from "./PostSkeleton";

const PostContainer: FC = () => {
  const { posts, loading } = useWeeklyMostUpvoted();

  if (loading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="card bg-base-100 w-full text-base-content h-min mq800:mt-3">
        <div className="card-body gap-4 py-10">
          <h2 className="card-title text-3xl">
            No top ranking posts this week!
          </h2>
          <p>Be the first to share something interesting!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col gap-5 mq800:gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostContainer;
