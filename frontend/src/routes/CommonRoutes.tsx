import CommonLayout from "@/components/Layout/CommonLayout";
import { useAuthContext } from "@/contexts/useAuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import NoFooterLayout from "@/components/Layout/NoFooterLayout";
import Colleges from "@/pages/Colleges";
import AddNewCollegePortal from "@/pages/AddNewCollegePortal";
import CollegePage from "@/pages/CollegePage";
import CommentPage from "@/pages/CommentPage";
import NotFound from "@/pages/NotFound";
import { withProfiler } from "@sentry/react";

import ImagesParent from "@/components/CollegeProfile/ImagesParent";
import PostParent from "@/components/CollegeProfile/PostParent";

const CommonRoutes = () => {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="colleges/:collegeId" element={<CollegePage />}>
          <Route path="posts" element={<PostParent />} />
          <Route path="images" element={<ImagesParent />} />
        </Route>
        <Route path="/post/comments/:postId" element={<CommentPage />} />
        <Route path="/colleges/add" element={<AddNewCollegePortal />} />
        {/* other routes */}
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
      </Route>
      // Routes with no footer
      <Route path="/auth" element={<NoFooterLayout />}>
        <Route
          path="login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Route>
    </Routes>
  );
};

export default withProfiler(CommonRoutes);
