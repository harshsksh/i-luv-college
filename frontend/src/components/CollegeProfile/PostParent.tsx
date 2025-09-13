import { useParams } from "react-router-dom";
import AddPost from "../Posts/AddPost";
import PostContainer from "../Posts/PostContainer";

const PostParent = () => {
  const { collegeId } = useParams();
  if (!collegeId) return <div>Can't find posts, some error occurred</div>;

  return (
    <div className="pt-10 py-20  flex mq800:flex-col  gap-6 ">
      <div>
        <AddPost collegeId={collegeId} />
      </div>
      <PostContainer collegeId={collegeId} />
    </div>
  );
};

export default PostParent;
