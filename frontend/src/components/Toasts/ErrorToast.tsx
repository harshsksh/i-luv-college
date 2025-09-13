import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

const ErrorToast = (message: string) => {
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
    action: (
      <ToastAction altText="Try again" onClick={() => window.location.reload()}>
        Reload Page
      </ToastAction>
    ),
  });
};

export default ErrorToast;
