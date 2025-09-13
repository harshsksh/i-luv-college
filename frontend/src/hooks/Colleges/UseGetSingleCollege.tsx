import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { College } from "./UseGetAllColleges";
import { toast } from "react-toastify";

const UseGetSingleCollege = ({ collegeId }: { collegeId: string }) => {
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState<College | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCollege = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/colleges/single/${collegeId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error || !data) {
          throw new Error(data.error || "College not found");
        }

        setCollege(data);
      } catch (error: any) {
        console.error("Error in UseGetSingleCollege hook ", error);

        toast.error(error);

        // Redirect to /notfound if there's an error or college is not found
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };
    getCollege();
  }, [collegeId, navigate]);

  return { loading, college };
};

export default UseGetSingleCollege;
