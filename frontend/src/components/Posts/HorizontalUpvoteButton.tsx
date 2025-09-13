import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useToggleUpvote } from "@/hooks/Posts/UseToggleUpvote";
import { useUpvoteStatus } from "@/hooks/Posts/UseCheckUpvote";
import { Loader } from "lucide-react";

const HorizontalUpvoteButton = ({
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
      className={`btn w-full flex flex-row items-center  font-bold text-md ${
        voted ? "btn-primary" : "btn-outline"
      }  gap-2  `}
      onClick={handleToggleUpvote}
      disabled={loading}
    >
      {buttonLoading || loading ? (
        <div className="animate-spin">
          <Loader />
        </div>
      ) : (
        <>
          {voted ? "" : <div>UPVOTE</div>}
          <div>{upvoteCount}</div>
          <div>
            <MdOutlineKeyboardArrowUp className="" />
          </div>
        </>
      )}
    </button>
  );
};

export default HorizontalUpvoteButton;
