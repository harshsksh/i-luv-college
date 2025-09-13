import { useAuthContext } from "@/contexts/useAuthContext";
import { Link, useLocation } from "react-router-dom";
import LogOutDialog from "./LogOutDialog";

const UserProfileIcon = () => {
  const { authUser } = useAuthContext();
  const location = useLocation();
  const isAuthPath = location.pathname.startsWith("/auth");

  return (
    <>
      {authUser ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar cursor-pointer">
            <div className="ring-accent ring-offset-base-100 w-10 mq725:w-8 rounded-full ring ring-offset-2">
              <img
                src={authUser.profilePicLink}
                alt={`${authUser.name}'s Profile`}
                aria-label="User Profile"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-min p-2 shadow-lg border-base-300 border-2"
          >
            <LogOutDialog />
          </ul>
        </div>
      ) : (
        !isAuthPath && (
          <Link to="/auth/login">
            <button className="btn btn-primary mq450:btn-ghost">Login</button>
          </Link>
        )
      )}
    </>
  );
};

export default UserProfileIcon;
