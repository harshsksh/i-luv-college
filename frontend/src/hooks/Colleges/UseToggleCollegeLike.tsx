import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/contexts/useAuthContext";
import { toast } from "react-toastify";

interface UseToggleCollegeLikeParams {
  collegeId: string;
  initialHasLiked: boolean;
  initialLikeCount: number;
}

interface UseToggleCollegeLikeResult {
  hasLiked: boolean;
  likeCount: number;
  toggleLike: () => Promise<void>;
  loading: boolean;
}

export const useToggleCollegeLike = ({
  collegeId,
  initialHasLiked,
  initialLikeCount,
}: UseToggleCollegeLikeParams): UseToggleCollegeLikeResult => {
  const { authUser } = useAuthContext();
  const [hasLiked, setHasLiked] = useState<boolean>(initialHasLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleLike = async () => {
    if (!authUser) {
      toast.error("Create an anonymous account to like");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `/api/colleges/togglelike/${collegeId}`,
        {
          userId: authUser.id,
        }
      );

      if (response.data.message === "Like added") {
        setHasLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      } else {
        setHasLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
      toast.error("An error occurred while toggling the like");
      console.error("Error toggling like:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    hasLiked,
    likeCount,
    toggleLike,
    loading,
  };
};
