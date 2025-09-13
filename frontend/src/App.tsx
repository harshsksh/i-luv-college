import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/utils/ScrollToTop";
import Loader from "./components/utils/Loader";

const CommonRoutes = lazy(() => import("./routes/CommonRoutes"));

function App() {
  return (
    <div className="font-poppins">
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <CommonRoutes />
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
