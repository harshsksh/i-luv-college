import { useParams } from "react-router-dom";
import AddImages from "./AddImages";
import AllCollegeImages from "./AllCollegeImages";

const ImagesParent = () => {
  const { collegeId } = useParams();
  if (!collegeId) return <div>Can't find images, some error occurred</div>;

  return (
    <div>
      <div className="mb-10">
        <AddImages collegeId={collegeId} />
      </div>
      <AllCollegeImages collegeId={collegeId} />
    </div>
  );
};

export default ImagesParent;
