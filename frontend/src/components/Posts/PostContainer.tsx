import { FC } from "react";
import PostCard from "./PostCard";
import UseGetPostsByCollege from "@/hooks/Posts/UseGetPostsByCollege";
import PostSkeleton from "./PostSkeleton";

interface PostContainerProps {
  collegeId: string;
}

const PostContainer: FC<PostContainerProps> = ({ collegeId }) => {
  const { loading, posts } = UseGetPostsByCollege(collegeId);

  if (loading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="card bg-primary w-full text-primary-content h-min mq800:mt-3">
        <div className="card-body gap-4 py-10 ">
          <h2 className="card-title  text-3xl">
            No crazy posts about this college yet!
          </h2>
          <p className=" ">
            Share this page or be the first person to write sh*t about this
            college!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" grow flex flex-col gap-5 mq800:gap-4 ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostContainer;
