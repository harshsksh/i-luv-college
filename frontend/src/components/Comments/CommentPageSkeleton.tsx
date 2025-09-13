const CommentPageSkeleton = () => {
  return (
    <div className="flex w-full min-h-screen flex-col gap-4 px-10 py-24">
      <div className="skeleton h-10 w-32"></div>

      <div className="grid grid-cols-2 gap-12 mq800:grid-cols-1 mt-16">
        <div className="flex gap-6">
          <div className="skeleton h-20 w-20"></div>
          <div className="skeleton h-52 w-full"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-10 mb-10 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentPageSkeleton;
