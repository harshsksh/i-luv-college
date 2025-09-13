import { Navigate } from "react-router-dom";
import ErrorToast from "../../components/Toasts/ErrorToast";
import { useAuthContext } from "@/contexts/useAuthContext";

const ProtectGaurd = ({ element }: any) => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    const error = new Error();
    error.message = "Create an anonymous account first!";
    ErrorToast(error.message);
    return <Navigate to="/auth/login" />;
  }

  return element;
};

export default ProtectGaurd;
