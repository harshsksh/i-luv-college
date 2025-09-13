import { useState } from "react";
import { toast } from "react-toastify";

const UseSubscribe = () => {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string) => {
    setLoading(true);
    toast.loading("Adding you mail..."); // Show loading toast
    try {
      const res = await fetch(`/api/subscribe/subscribe`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.dismiss(); // Dismiss loading toast
      toast.success("E-Mail added successfully!"); // Show success toast
    } catch (error: any) {
      console.error("Error in UseSubscribe hook ", error.message);
      toast.dismiss(); // Dismiss loading toast
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, subscribe };
};

export default UseSubscribe;
