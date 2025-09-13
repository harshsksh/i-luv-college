import React, { useState } from "react";
import ImageCard from "./ImageCard";
import useAllCollegeImages from "@/hooks/Colleges/useAllCollegeImages";
import ImageModal from "./ImageModal";

interface ImageData {
  id: string;
  imageURL: string;
  likes: number;
  uploadedBy: string;
  uploadedAt: Date;
}

const AllCollegeImages: React.FC<{ collegeId: string }> = ({ collegeId }) => {
  const { images, loading } = useAllCollegeImages(collegeId);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const generateRandomSize = () => {
    const sizes = [
      { height: "100px", width: "100%" },
      { height: "200px", width: "100%" },
      { height: "300px", width: "100%" },
      { height: "50px", width: "100%" },
      { height: "400px", width: "100%" },
      { height: "250px", width: "100%" },
    ];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const addCloudinaryTransformations = (url: string) => {
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/q_auto/f_auto/${parts[1]}`;
  };

  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="skeleton"
            style={generateRandomSize()}
          ></div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="card bg-primary w-full text-primary-content h-min mq800:mt-3">
        <div className="card-body gap-4 py-10">
          <h2 className="card-title text-3xl">
            No images about this college yet!
          </h2>
          <p>
            Share this page or be the first person to upload some crazy
            memories!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imageURL={addCloudinaryTransformations(image.imageURL)}
            initialLikes={image.likes}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={{
            ...selectedImage,
            imageURL: addCloudinaryTransformations(selectedImage.imageURL),
          }}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default AllCollegeImages;
