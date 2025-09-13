import { toast } from "../ui/use-toast";

const SuccessToast = (message: string) => {
  toast({
    variant: "success",
    title: "Success",
    description: message,
  });
};

export default SuccessToast;
