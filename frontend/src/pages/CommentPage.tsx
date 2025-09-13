import CommentForm from "@/components/Comments/CommentForm";
import CommentHeroPostCard from "@/components/Comments/CommentHeroPostCard";
import CommentSection from "@/components/Comments/CommentSection";
import UseGetSinglePost from "@/hooks/Posts/UseGetSinglePost";
import { Link, useParams } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import CommentPageSkeleton from "@/components/Comments/CommentPageSkeleton";
import ShareButtons from "@/components/utils/ShareButtons";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet-async";

const CommentPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) return <NotFound />;

  const { loading, post } = UseGetSinglePost({ postId });

  if (loading) return <CommentPageSkeleton />;
  if (!post)
    return (
      <div className="min-h-screen flex justify-center items-center">
        No post found
      </div>
    );

  const pageTitle = `${post.postTitle} • ${post.collegeName} •`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Comments on ${post.postTitle} at ${post.collegeName}`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={`Join the discussion on ${post.postTitle} at ${post.collegeName}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.profilePicLink} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={`Comments on ${post.postTitle} at ${post.collegeName}`}
        />
        <meta name="twitter:image" content={post.profilePicLink} />
        <link
          rel="canonical"
          href={`https://iluvcollege.vercel.app/post/comments/${postId}`}
        />
      </Helmet>

      <div className="min-h-screen px-10 mq725:px-5 py-24">
        <Link
          to={`/colleges/${post.collegeId}/posts`}
          className="flex gap-4 items-center"
        >
          <button className="btn btn-square" aria-label="Go back to posts">
            <RiArrowGoBackLine />
          </button>
          <div className="font-semibold">{post.collegeName}</div>
        </Link>
        <div className="grid grid-cols-2 gap-6 mq800:grid-cols-1 mt-16 mq450:mt-10">
          <div className="flex justify-center mq800:mx-0">
            <CommentHeroPostCard post={post} />
          </div>
          <div>
            <div className="mb-5">
              <CommentForm postId={postId} />
            </div>
            <div className="flex flex-col">
              <ShareButtons
                center={false}
                title={pageTitle}
                message="Check out this college hate page"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mt-10">Comments</h2>
              <CommentSection comments={post.comments} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
