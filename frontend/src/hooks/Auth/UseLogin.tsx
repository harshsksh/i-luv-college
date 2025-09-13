import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const UseLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    setLoading(true);
    
    try {

      const res = await fetch(`/api/users/login`, {
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
      toast.success("Welcome back to hate your college!");
    } catch (error: any) {
      console.error("Error in Uselogin hook ");

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default UseLogin;
