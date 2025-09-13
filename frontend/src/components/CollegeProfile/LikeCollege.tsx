import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/contexts/useAuthContext";
import { toast } from "react-toastify";
import { useToggleCollegeLike } from "@/hooks/Colleges/UseToggleCollegeLike";
import { UseLikeCollegeCheck } from "@/hooks/Colleges/UseLikeCollegeCheck";

const LikeCollege = ({
  collegeId,
  collegeLikes,
}: {
  collegeId: string;
  collegeLikes: number;
}) => {
  const { authUser } = useAuthContext();

  const { hasLiked, loading: statusLoading } = UseLikeCollegeCheck(collegeId);
  const [localLikes, setLocalLikes] = useState<number>(collegeLikes);
  const [localHasLiked, setLocalHasLiked] = useState<boolean>(hasLiked);

  const { toggleLike, loading: toggling } = useToggleCollegeLike({
    collegeId,
    initialHasLiked: hasLiked!,
    initialLikeCount: collegeLikes,
  });

  useEffect(() => {
    setLocalHasLiked(hasLiked);
  }, [hasLiked]);

  const handleToggleLike = async () => {
    try {
      await toggleLike();
      setLocalHasLiked((prev) => !prev);
      setLocalLikes((prev) => (localHasLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error("Failed to toggle like");
    }
  };

  if (statusLoading || toggling) {
    return (
      <div className="animate-spin">
        <Loader />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex flex-col text-center items-center space-y-2">
        <button
          onClick={() => toast.error("Create an anonymous account to Like")}
          className="text-4xl text-gray-400 animate-bounce"
        >
          <AiOutlineHeart />
        </button>
        <span className="text-sm">Login to see</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleToggleLike}
        disabled={toggling}
        className={`text-4xl ${
          localHasLiked ? "text-primary" : "text-gray-400 animate-bounce"
        }`}
      >
        {localHasLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <span className="text-lg font-semibold">{localLikes}</span>
    </div>
  );
};

export default LikeCollege;
