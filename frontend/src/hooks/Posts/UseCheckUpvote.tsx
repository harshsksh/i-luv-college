import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/contexts/useAuthContext";

interface UseUpvoteStatusResult {
  hasUpvoted: boolean;
  loading: boolean;
  error: string | null;
}

export const useUpvoteStatus = (postId: string): UseUpvoteStatusResult => {
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const checkUpvoteStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(`/api/posts/checkupvote/${postId}`, {
          userId: authUser.id,
        });

        setHasUpvoted(response.data.hasUpvoted);
      } catch (err) {
        setError("Failed to check upvote status");
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      checkUpvoteStatus();
    } else {
      setLoading(false);
    }
  }, [postId, authUser]);

  return { hasUpvoted, loading, error };
};
