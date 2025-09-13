import React, { useState, ChangeEvent, FormEvent } from "react";
import WelcomeUser from "@/components/utils/WelcomeUser";
import UseAddNewCollege from "@/hooks/Colleges/UseAddNewCollege";
import { toast } from "react-toastify";

const AddNewCollegePortal: React.FC = () => {
  const [collegeName, setCollegeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { createCollege, loading } = UseAddNewCollege();

  const MAX_COLLEGE_NAME_LENGTH = 200;
  const MAX_DESCRIPTION_LENGTH = 200;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validFiles: File[] = [];

      selectedFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error("Only image files are allowed.");
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast.error(
            `${file.name} is too large. Please upload images smaller than 10MB.`
          );
          return;
        }

        validFiles.push(file);
      });

      if (validFiles.length > 0) {
        setFiles(validFiles);
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!collegeName || !description) {
      return toast.error("Please fill in all required fields.");
    }

    if (collegeName.length > MAX_COLLEGE_NAME_LENGTH) {
      return toast.error("College name exceeds the maximum character limit.");
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return toast.error("Description exceeds the maximum character limit.");
    }

    await createCollege(collegeName, description, files);
  };

  return (
    <div className="min-h-screen px-10 mq725:px-5 py-24 mq725:pb-24">
      <WelcomeUser />

      <div className="mx-auto">
        <div className="card bg-primary mt-7 text-primary-content shadow-xl mb-8">
          <div className="card-body">
            <h1 className="card-title text-4xl font-bold mb-4">
              Add Your College
            </h1>
            <p className="text-lg">
              Ready to spill the tea? Add your college here, so that everyone
              can see the real side of your useless college.
            </p>
          </div>
        </div>

        <form className="bg-base-100 space-y-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                College Name
              </span>
              <span className="label-text-alt">
                {collegeName.length}/{MAX_COLLEGE_NAME_LENGTH} characters
              </span>
            </label>
            <input
              type="text"
              placeholder="What's your college called?"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              maxLength={MAX_COLLEGE_NAME_LENGTH}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Description
              </span>
              <span className="label-text-alt">
                {description.length}/{MAX_DESCRIPTION_LENGTH} characters
              </span>
            </label>
            <textarea
              placeholder="Go on, write the most outrageous description about your college! Don't hold back..."
              className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Add College Images (Optional)
              </span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleImageUpload}
            />
            <p className="mt-2 text-sm text-base-content mb-5">
              Upload pics that perfectly capture the madness. (We promise, no
              one will judge!)
            </p>

            {/* Image Preview Section */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="w-full h-52 border border-base-content rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-control mt-8">
            <button
              className="btn btn-accent btn-lg w-full text-xl my-6 mb-16"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sharing Your sh*tty College..." : "Add your College"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCollegePortal;
