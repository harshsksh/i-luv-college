import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import AddNew from "@/components/Colleges/AddNew";
import UseGetAllColleges from "@/hooks/Colleges/UseGetAllColleges";
import CollegeCard from "@/components/Colleges/CollegeCard";
import SearchBar from "../components/utils/SearchBar";
import WelcomeUser from "@/components/utils/WelcomeUser";
import { useAuthContext } from "@/contexts/useAuthContext";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="flex flex-col gap-4">
    <div className="skeleton h-48 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);

const Colleges = () => {
  const { loading, colleges } = UseGetAllColleges();
  const [searchQuery, setSearchQuery] = useState("");
  const { authUser } = useAuthContext();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [colleges, searchQuery]);

  return (
    <div className="min-h-screen px-10 mq725:px-5 py-24">
      <Helmet>
        <title>Colleges - Explore and Add Your Most Hated Colleges</title>
        <meta
          name="description"
          content="Browse and add your most hated colleges. Explore a wide range of colleges, search by name, and contribute by adding new ones."
        />
        <meta
          name="keywords"
          content="colleges, university, education, search colleges, add colleges"
        />
        <meta
          property="og:title"
          content="Colleges - Explore and Add Your Most Hated Colleges"
        />
        <meta
          property="og:description"
          content="Browse and add your most hated colleges. Explore a wide range of colleges, search by name, and contribute by adding new ones."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta
          property="og:url"
          content="https://iluvcollege.vercel.app/colleges"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://iluvcollege.vercel.app/colleges`}
        />
      </Helmet>

      <div className="flex justify-between mq725:flex-col gap-10">
        <WelcomeUser />
        <SearchBar onSearch={handleSearch} />
      </div>

      <h1 className="text-3xl font-bold hidden">Explore Most Hated Colleges</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-8">
        <AddNew authUser={authUser} />
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                description={college.description}
                imageURL={college.images[0]?.imageURL}
              />
            ))}
      </div>
    </div>
  );
};

export default Colleges;
