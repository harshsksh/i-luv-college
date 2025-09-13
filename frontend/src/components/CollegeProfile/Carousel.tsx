import { Image } from "@/hooks/Colleges/UseGetAllColleges";
import { useEffect, useState } from "react";
import { GoDotFill, GoDot } from "react-icons/go";

interface CarouselProps {
  images: Image[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const openModal = (imageURL: string) => {
    setSelectedImage(imageURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const addCloudinaryTransformations = (url: string) => {
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/q_auto/f_auto/${parts[1]}`;
  };

  return (
    <div className="carousel mq450:w-full h-96 w-96 relative rounded-box overflow-hidden">
      <div
        className="carousel-inner flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item flex-shrink-0 w-full"
            onClick={() =>
              openModal(addCloudinaryTransformations(image.imageURL))
            }
          >
            <img
              src={addCloudinaryTransformations(image.imageURL)}
              className="w-full object-contain rounded-3xl cursor-pointer"
              alt={`Slide ${index + 1} of ${images.length}`}
              title={`Image ${index + 1}`}
              loading="lazy"
              width="100%"
              height="auto"
            />
          </div>
        ))}
      </div>

      <div className="absolute flex items-center left-2 gap-1 bottom-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="hover:text-xl"
          >
            {currentIndex === index ? (
              <GoDotFill className="text-accent text-xl" />
            ) : (
              <GoDot className="text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              src={selectedImage}
              className="max-w-full max-h-[550px] rounded-2xl"
              alt="Full view"
              title="Full view"
              loading="lazy"
              width="100%"
              height="auto"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white btn btn-accent btn-sm"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
