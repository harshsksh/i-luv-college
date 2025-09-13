import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const UseSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const signup = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("i-luv-college-local-token", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Let your frustrations out !!!");
    } catch (error) {
      console.error("Error in UseSignup hook");

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default UseSignup;
