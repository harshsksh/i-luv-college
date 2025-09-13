import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/contexts/useAuthContext";

interface UseLikeStatusResult {
  hasLiked: boolean;
  loading: boolean;
  error: string | null;
}

export const useLikeStatus = (imageId: string): UseLikeStatusResult => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(`/api/images/checklike/${imageId}`, {
          userId: authUser.id,
        });

        setHasLiked(response.data.hasLiked);
      } catch (err) {
        setError("Failed to check like status");
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      checkLikeStatus();
    } else {
      setLoading(false);
    }
  }, [imageId, authUser]);

  return { hasLiked, loading, error };
};
