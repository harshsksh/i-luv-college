import {
  AboutSectionImg,
  AboutSectionImg1,
  AboutSectionImg2,
  AboutSectionImg3,
  AboutSectionImg4,
  AboutSectionImg5,
} from "@/constants/images";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  const aboutImages = [
    AboutSectionImg,
    AboutSectionImg1,
    AboutSectionImg2,
    AboutSectionImg3,
    AboutSectionImg4,
    AboutSectionImg5,
  ];
  const randomAboutImage =
    aboutImages[Math.floor(Math.random() * aboutImages.length)];

  return (
    <div className="px-10 mq725:px-5 grid grid-cols-2 mq725:grid-cols-1 items-center gap-10 mt-20">
      <div>
        <img
          src={randomAboutImage}
          alt="About section image"
          title="Discover your college tribe"
          width="100%"
          height="auto"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <h2 className="font-bangers text-left text-6xl mq725:text-5xl">
          Find your <span className="text-accent">tribe</span>
        </h2>
        <h4 className="text-2xl mq725:text-xl mt-6 font-medium text-left">
          Find your college, listen to what others are saying,{" "}
          <span className="text-accent">upvote their ideas</span> or express
          your own.
        </h4>
        <ul className="mt-4 text-lg text-gray-500 mq725:text-base list-disc list-inside">
          <li className="mt-2">
            Post about <span className="text-accent">affairs</span> and juicy
            gossip.
          </li>
          <li className="mt-2">
            Make anonymous <span className="text-accent">confessions</span> or
            share secrets.
          </li>
          <li className="mt-2">
            Vent your frustrations and{" "}
            <span className="text-accent">talk shit</span> about professors.
          </li>
          <li className="mt-2">
            Share anything about college life,{" "}
            <span className="text-accent">anonymously</span>.
          </li>
        </ul>
        <button
          className="btn btn-outline btn-accent max-w-xs btn-lg mt-7"
          onClick={() => navigate("colleges")}
        >
          Explore Colleges
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
