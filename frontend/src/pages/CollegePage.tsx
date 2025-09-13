import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import UseGetSingleCollege from "@/hooks/Colleges/UseGetSingleCollege";
import CollegeProfile from "@/components/CollegeProfile/CollegeProfile";
import CollegePageSkeleton from "@/components/CollegeProfile/CollegePageSkeleton";
import NotFound from "./NotFound";

const CollegePage = () => {
  const { collegeId } = useParams<{ collegeId: string }>();

  if (!collegeId) return <NotFound />;

  const { loading, college } = UseGetSingleCollege({ collegeId });

  if (loading) return <CollegePageSkeleton />;
  if (!college)
    return (
      <div className="min-h-screen flex justify-center items-center">
        No college found
      </div>
    );

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>{college.name} - Sh*t Posts and Images | I LUV COLLEGE</title>
        <meta
          name="description"
          content={`Explore sh*t posts and images about ${college.name}. Join the conversation, upvote, and comment anonymously.`}
        />
        <meta
          name="keywords"
          content={`sh*t posts, college hate, ${college.name}, upvote, comment`}
        />
        <meta
          property="og:title"
          content={`${college.name} - Sh*t Posts and Images | I LUV COLLEGE`}
        />
        <meta
          property="og:description"
          content={`Explore sh*t posts and images about ${college.name}. Join the conversation, upvote, and comment anonymously.`}
        />
        <meta
          property="og:image"
          content={college.images[0]?.imageURL || "/favicon.png"}
        />
        <meta
          property="og:url"
          content={`https://iluvcollege.vercel.app/colleges/${collegeId}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://iluvcollege.vercel.app/colleges/${collegeId}`}
        />
      </Helmet>
      <CollegeProfile college={college} />
    </div>
  );
};

export default CollegePage;
