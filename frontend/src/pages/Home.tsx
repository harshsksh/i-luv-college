// Home.tsx
import AboutCardSection from "@/components/Layout/AboutCardSection";
import AboutSection from "@/components/Layout/AboutSection";
import {
  HeroImage1,
  HeroImage2,
  HeroImage3,
  HeroImage4,
} from "@/constants/images";
import { useNavigate } from "react-router-dom";
import PostContainer from "@/components/Posts/PostContainerhome";
const Home = () => {
  const navigate = useNavigate();

  const heroImages = [HeroImage1, HeroImage2, HeroImage3, HeroImage4];
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <div className="pt-20 bg-base-100">
      <div className="px-10 mq725:px-5 grid grid-cols-2 mq725:grid-cols-1 items-center">
        <div className="order-1 mq725:order-2 flex flex-col gap-10 mq725:gap-5">
          <h1 className="font-bangers text-9xl mq725:text-7xl">
            <span className="text-accent">College</span> Got You{" "}
            <span className="text-accent">Down?</span>
          </h1>
          <p className="text-2xl mq725:text-xl font-medium">
            <span className="text-accent">Anonymously</span> post your
            frustrations and connect with fellow students.{" "}
            <span className="text-accent">
              Let it all out and feel the relief!
            </span>
          </p>
          <button
            className="btn btn-accent max-w-xs btn-lg mt-7"
            onClick={() => navigate("colleges")}
          >
            Find your College
          </button>
        </div>
        <div className="order-2 mq725:order-1">
          <img
            src={randomImage}
            alt="College stress hero image"
            title="Express your college frustrations"
            width="100%"
            height="auto"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <AboutSection />
      <div className="px-10 mq725:px-5 mt-14">
        <div className="pt-10 py-20 flex-col gap-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Top 3 Posts this Week !!!
          </h2>
          <PostContainer />
        </div>
      </div>
      <AboutCardSection />
    </div>
  );
};

export default Home;
