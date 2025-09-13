import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "@/contexts/useAuthContext";

interface UseLikeCollegeCheckResult {
  hasLiked: boolean;
  toggleLike: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const UseLikeCollegeCheck = (
  collegeId: string
): UseLikeCollegeCheckResult => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { authUser } = useAuthContext();

  const fetchLikeStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `/api/colleges/checklike/${collegeId}`,
        {
          userId: authUser.id,
        }
      );

      setHasLiked(response.data.hasLiked);
    } catch (err) {
      setError("Failed to fetch like status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchLikeStatus();
    }
  }, [collegeId, authUser]);

  const toggleLike = useCallback(async () => {
    if (!authUser) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `/api/colleges/togglelike/${collegeId}`,
        {
          userId: authUser.id,
        }
      );

      setHasLiked(response.data.hasLiked);
    } catch (err) {
      setError("Failed to toggle like status");
    } finally {
      setLoading(false);
    }
  }, [collegeId, authUser]);

  return { hasLiked, toggleLike, loading, error };
};
