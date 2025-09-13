import { Link, useLocation } from "react-router-dom";

interface TabsProps {
  collegeId: string;
}

const Tabs = ({ collegeId }: TabsProps) => {
  const location = useLocation();

  const tabs = [
    { path: `/colleges/${collegeId}/posts`, label: "Posts" },
    { path: `/colleges/${collegeId}/images`, label: "College Images" },
  ];

  return (
    <div className="w-full mt-8">
      <div role="tablist" className="tabs tabs-bordered bg-base-200">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            role="tab"
            to={tab.path}
            className={`tab mt-5 pb-5 text-gray-500 text-center font-semibold cursor-pointer ${
              location.pathname === tab.path
                ? "tab-active text-base-content"
                : ""
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
