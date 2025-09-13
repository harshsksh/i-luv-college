import { useAuthContext } from "@/contexts/useAuthContext";
import AddNewImages from "@/hooks/Colleges/AddNewImages";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface AddImagesProps {
  collegeId: string;
}

const AddImages = ({ collegeId }: AddImagesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { authUser } = useAuthContext();
  const { loading, addImages } = AddNewImages();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 10MB.`);
        return false;
      }
      return true;
    });
    setSelectedFiles(validFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }
    await addImages(collegeId, selectedFiles);
    setIsModalOpen(false);
    setSelectedFiles([]);
  };

  return (
    <div>
      {!authUser ? (
        <Link to={"/auth/login"}>
          <button className="btn  btn-outine btn-primary w-full ">
            Upload Images
          </button>
        </Link>
      ) : (
        <button
          className="btn  btn-outine btn-primary w-full "
          onClick={() => setIsModalOpen(true)}
        >
          Upload College Images
        </button>
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload Images</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full mt-4 mq450:file-input-sm "
            />
            <div className="modal-action">
              <button className="btn " onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-success "
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  "Uploading..."
                ) : (
                  <div className="flex items-center gap-3">
                    Upload
                    <FaFileUpload />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddImages;
