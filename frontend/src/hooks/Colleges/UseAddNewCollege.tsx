import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UseAddNewCollege = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const uploadImagesToCloudinary = async (files: File[]) => {
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_COLLEGE_IMAGES
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      imageUrls.push(data.secure_url);
    }

    return imageUrls;
  };

  const createCollege = async (
    name: string,
    description: string,
    files: File[]
  ) => {
    setLoading(true);
    try {
      const imageUrls = await uploadImagesToCloudinary(files);

      const res = await fetch(`/api/colleges/addnew`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          imageUrls,
          createdBy: authUser?.id,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Navigate to the newly created college's posts page
      navigate(`/colleges/${data.id}/posts`);
      toast.success("College added successfully");
    } catch (error: any) {
      console.error("Error in UseAddNewCollege hook ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createCollege };
};

export default UseAddNewCollege;
