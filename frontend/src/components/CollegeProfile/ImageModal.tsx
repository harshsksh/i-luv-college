import React from "react";
import { MdOutlineOpenInNew } from "react-icons/md";

interface ImageData {
  id: string;
  imageURL: string;
  likes: number;
  uploadedBy: string;
  uploadedAt: string | Date; // Accept both string and Date
}

interface ImageModalProps {
  image: ImageData;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  // Convert uploadedAt to Date if it's a string
  const uploadedDate =
    typeof image.uploadedAt === "string"
      ? new Date(image.uploadedAt)
      : image.uploadedAt;

  const handleOpenInNewTab = () => {
    window.open(image.imageURL, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="card glass card-compact bg-base-300 bg-opacity-50 max-h-[80%] shadow-xl mx-10 mq725:mx-5">
        <figure>
          <img
            src={image.imageURL}
            alt="I LUV COLLEGE College Image"
            title="I LUV COLLEGE College Image"
            className=""
            width="100%"
            loading="lazy"
            height="auto"
          />
        </figure>
        <div className="card-body font-semibold">
          <p>Uploaded by: {image.uploadedBy}</p>
          <p>Uploaded at: {uploadedDate.toLocaleString()}</p>
          <p>Likes: {image.likes}</p>
          <div className="card-actions justify-end mt-5">
            <button className="btn" onClick={onClose}>
              Close
            </button>
            <button className="btn" onClick={handleOpenInNewTab}>
              Open in New Tab
              <MdOutlineOpenInNew />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
