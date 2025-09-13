import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/contexts/useAuthContext";
import { toast } from "react-toastify";

interface UseToggleUpvoteParams {
  postId: string;
  initialUpvoteCount: number;
}

interface UseToggleUpvoteResult {
  hasUpvoted: boolean;
  upvoteCount: number;
  toggleUpvote: () => Promise<void>;
  loading: boolean;
}

export const useToggleUpvote = ({
  postId,
  initialUpvoteCount,
}: UseToggleUpvoteParams): UseToggleUpvoteResult => {
  const { authUser } = useAuthContext();
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(initialUpvoteCount);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleUpvote = async () => {
    if (!authUser) {
      toast.error(`Create an anonymous account to upvote`);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`/api/posts/togglevote/${postId}`, {
        userId: authUser.id,
      });

      if (response.data.message === "Upvote added") {
        setHasUpvoted(true);
        setUpvoteCount((prevCount) => prevCount + 1);
      } else {
        setHasUpvoted(false);
        setUpvoteCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return {
    hasUpvoted,
    upvoteCount,
    toggleUpvote,
    loading,
  };
};
