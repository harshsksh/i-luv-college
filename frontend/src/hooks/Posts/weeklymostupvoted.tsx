// Weekly_most_upvoted.ts
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  username: string;
};

export type Post = {
  id: string;
  College?: { // Make sure College is optional with '?'
    name: string;
  };
  createdAt: string; // Use string if you're getting date in ISO format
  postTitle: string;
  postDescription: string;
  upvotes: number;
  User: User;
};

const useWeeklyMostUpvoted = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch

      try {
        const res = await fetch(`/api/posts/weekly_most_upvoted`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
       
        // Assuming `data` is an array of posts
        if (Array.isArray(data)) {
          setPosts(data);
         
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError(error.message || "An error occurred");
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);
 console.log(posts,"post");
  return { posts, loading, error };
};

export default useWeeklyMostUpvoted;
