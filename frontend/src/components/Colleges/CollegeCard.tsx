import { Link } from "react-router-dom";

interface CollegeCardProps {
  id: string;
  name: string;
  description: string;
  imageURL?: string;
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  id,
  name,
  description,
  imageURL,
}) => {
  const truncatedDescription =
    description.length > 200 ? `${description.slice(0, 200)}...` : description;

  return (
    <Link to={`/colleges/${id}/posts`} className="w-full">
      <div className="card shadow-md hover:shadow-xl transition-all duration-500">
        <figure>
          {imageURL ? (
            <img
              src={imageURL}
              alt={`Image of ${name}`}
              title={name}
              className="w-full h-48 object-cover brightness-[85%]"
              width="100%"
              height="192px"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-48 bg-base-300 flex items-center justify-center text-gray-500"
              title="No image available"
            >
              Be the first to upload an image!
            </div>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase">{name}</h2>
          <p>{truncatedDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
