import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useToggleLike } from "@/hooks/Images/UseToggleLike";
import { useLikeStatus } from "@/hooks/Images/UseLikeStatus";
import { Loader } from "lucide-react";

interface ImageCardProps {
  imageURL: string;
  id: string;
  initialLikes: number;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  imageURL,
  initialLikes,
  onClick,
}) => {
  const { likeCount, toggleLike, loading } = useToggleLike({
    imageId: id,
    initialLikeCount: initialLikes,
  });

  const { hasLiked, loading: buttonLoading } = useLikeStatus(id);

  const [liked, setLiked] = useState(hasLiked);

  useEffect(() => {
    setLiked(hasLiked);
  }, [hasLiked]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    // Stop the click event from bubbling up to the parent div
    e.stopPropagation();
    try {
      await toggleLike();
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div
      className="relative rounded-3xl cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <img
        src={imageURL}
        alt="I LUV COLLEGE College Image"
        title="I LUV COLLEGE College Image"
        className="w-full h-auto object-cover rounded-3xl"
        width="100%"
        height="auto"
        loading="lazy"
      />
      <button
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 flex items-center"
        onClick={handleToggleLike}
        disabled={loading}
      >
        {buttonLoading || loading ? (
          <div className="animate-spin">
            <Loader />
          </div>
        ) : liked ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart className="text-gray-500" />
        )}
        <span className="text-gray-700 ml-2">{likeCount}</span>
      </button>
    </div>
  );
};

export default ImageCard;
