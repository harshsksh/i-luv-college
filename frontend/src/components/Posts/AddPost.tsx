import { useAuthContext } from "@/contexts/useAuthContext";
import UseCreatePost from "@/hooks/Posts/UseCreatePost";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddPost = ({ collegeId }: { collegeId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, createPost } = UseCreatePost();
  const { authUser } = useAuthContext();

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Character limits
  const MAX_TITLE_LENGTH = 200;
  const MAX_DESCRIPTION_LENGTH = 3000;

  const handleSubmit = async () => {
    if (!title || !description) {
      return toast.error("Please fill in all required fields.");
    }

    if (title.length > MAX_TITLE_LENGTH) {
      return toast.error("Title exceeds the maximum character limit.");
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return toast.error("Description exceeds the maximum character limit.");
    }

    await createPost(title, description, collegeId);
    setIsModalOpen(false); // Close the modal after post creation
  };

  return (
    <>
      {/* Hidden on screens larger than 800px */}
      <div className="card bg-base-100 text-base-content h-min mq800:hidden hover:shadow-lg">
        <div className="card-body min-w-[450px] mq1000:min-w-[350px]">
          <h2 className="card-title font-bold">Add a Post</h2>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500">
              Short, descriptive title
            </label>
            <input
              type="text"
              placeholder="Title..."
              className="input input-bordered mt-1 w-full"
              value={title}
              required
              maxLength={MAX_TITLE_LENGTH}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="label-text-alt text-gray-500 ">
              {title.length}/{MAX_TITLE_LENGTH} characters
            </span>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500">
              Description
            </label>
            <textarea
              placeholder="Any dirty secret about your college or your college life."
              className="textarea textarea-bordered mt-1 w-full"
              value={description}
              required
              maxLength={MAX_DESCRIPTION_LENGTH}
              onChange={(e) => setDescription(e.target.value)}
              rows={7}
            />
            <span className="label-text-alt text-gray-500 ">
              {description.length}/{MAX_DESCRIPTION_LENGTH} characters
            </span>
          </div>

          {!authUser ? (
            <Link to={"/auth/login"}>
              <button
                onClick={() => {}}
                className={`btn btn-primary btn-block mt-4`}
                type="button"
              >
                Create a Post
              </button>
            </Link>
          ) : (
            <button
              onClick={handleSubmit}
              className={`btn btn-primary btn-block mt-4 ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
              type="button"
            >
              Create Post
            </button>
          )}
        </div>
      </div>

      {/* Display on screens smaller than 800px */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary btn-block mq800:block hidden"
      >
        Add a Post
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="card-title font-bold">Add a Post</h2>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-500">
                Short, descriptive title
              </label>
              <input
                type="text"
                placeholder="Title..."
                className="input input-bordered mt-1 w-full"
                value={title}
                required
                maxLength={MAX_TITLE_LENGTH}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="label-text-alt text-gray-500 ">
                {title.length}/{MAX_TITLE_LENGTH} characters
              </span>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-500">
                Description
              </label>
              <textarea
                placeholder="Any dirty secret about your college or your college life."
                className="textarea textarea-bordered mt-1 w-full"
                value={description}
                required
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
              <span className="label-text-alt text-gray-500 ">
                {description.length}/{MAX_DESCRIPTION_LENGTH} characters
              </span>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              {!authUser ? (
                <Link to={"/auth/login"}>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    className={`btn btn-primary`}
                    type="button"
                  >
                    Add a Post
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleSubmit}
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                  type="button"
                >
                  Add a Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
