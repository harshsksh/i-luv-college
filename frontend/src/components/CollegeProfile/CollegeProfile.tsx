import { College } from "@/hooks/Colleges/UseGetAllColleges";
import Carousel from "./Carousel";
import LikeCollege from "./LikeCollege";
import ShareButtons from "../utils/ShareButtons";

import Tabs from "./Tabs";
import { Outlet } from "react-router-dom";

interface CollegeProfileProps {
  college: College;
}

const CollegeProfile = ({ college }: CollegeProfileProps) => {
  const formattedDate = new Date(college.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const pageTitle = `${college.name} • Hate Page •`;

  return (
    <div>
      <div className="flex  px-10 mq725:px-5 items-center  mq800:flex-col gap-10">
        <div className="">
          {college.images.length > 0 && (
            <Carousel images={college.images.slice(0, 5)} />
          )}
          {college.images.length === 0 && (
            <div className=" mq800:mx-auto w-96 mq500:w-full mq500:px-14 relative bg-base-200 h-96 rounded-box shadow-lg flex items-center justify-center text-gray-500">
              Be the first to upload an image!
            </div>
          )}
        </div>
        <article className="flex flex-col w-full     ">
          <div>
            <h1 className="text-3xl font-bold">{college.name}</h1>
            <h2 className="text-lg font-semibold text-gray-500">
              {college.description}
            </h2>
          </div>
          <div className="mt-7 flex justify-between">
            <div>
              <p className="text-sm text-base-content">
                Created by {college.creator.username}
              </p>
              <p className="text-sm text-base-content">
                Created at {formattedDate}
              </p>
              <div className=" my-5 ">
                <ShareButtons
                  center={false}
                  title={pageTitle}
                  message={"Check out this college hate page"}
                />
              </div>
            </div>
            <div className="mt-[-15px]">
              <LikeCollege
                collegeId={college.id}
                collegeLikes={college.likes}
              />
            </div>
          </div>
        </article>
      </div>

      <div className="mt-10">
        <Tabs collegeId={college.id} />
      </div>

      <div className="px-10 mq725:px-5 pt-10 py-20 bg-base-200">
        <Outlet />
      </div>
    </div>
  );
};

export default CollegeProfile;
