import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useToggleUpvote } from "@/hooks/Posts/UseToggleUpvote";
import { useUpvoteStatus } from "@/hooks/Posts/UseCheckUpvote";
import { Loader } from "lucide-react";

const UpvoteButton = ({
  postId,
  initialUpvoteLength,
}: {
  postId: string;
  initialUpvoteLength: number;
}) => {
  const { upvoteCount, toggleUpvote, loading } = useToggleUpvote({
    postId,
    initialUpvoteCount: initialUpvoteLength,
  });

  const { hasUpvoted, loading: buttonLoading } = useUpvoteStatus(postId);

  const [voted, setVoted] = useState(hasUpvoted);

  useEffect(() => {
    setVoted(hasUpvoted);
  }, [hasUpvoted]);

  const handleToggleUpvote = async () => {
    try {
      await toggleUpvote();
      setVoted((prev) => !prev);
    } catch (err) {
      console.error("Error toggling upvote:", err);
    }
  };

  return (
    <button
      className={`btn flex flex-col items-center justify-center w-12 h-16 mq500:w-12 mq500:h-16 mq500:text-sm font-bold text-md ${
        voted ? "btn-primary" : "btn-outline"
      } gap-2`}
      onClick={handleToggleUpvote}
      disabled={loading}
      title={voted ? "Remove upvote" : "Upvote"}
    >
      {buttonLoading || loading ? (
        <div className="animate-spin">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <MdOutlineKeyboardArrowUp />
          </div>
          <div>{upvoteCount}</div>
        </>
      )}
    </button>
  );
};

export default UpvoteButton;
