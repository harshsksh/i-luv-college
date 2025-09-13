import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface ImageData {
  id: string;
  imageURL: string;
  likes: number;
  uploadedBy: string; // Assuming this is a string (e.g., username)
  uploadedAt: Date;
}

const useAllCollegeImages = (collegeId: string) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/images/allimages/${collegeId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch images");
        }

        setImages(data);
      } catch (error: any) {
        console.error("Error in useAllCollegeImages hook", error);
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [collegeId]);

  return { images, loading };
};

export default useAllCollegeImages;
