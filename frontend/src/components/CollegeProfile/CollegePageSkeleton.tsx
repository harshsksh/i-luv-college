const CollegePageSkeleton = () => {
  return (
    <div className="flex w-full min-h-screen flex-col gap-4 px-10 py-24">
      <div className="flex items-center mq800:flex-col gap-4">
        <div className="skeleton h-96 w-[400px]"></div>
        <div className="flex flex-col gap-3 ">
          <div className="skeleton h-4  w-28"></div>
          <div className="skeleton h-4  w-28"></div>
          <div className="skeleton h-4  w-28"></div>
        </div>
      </div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default CollegePageSkeleton;
