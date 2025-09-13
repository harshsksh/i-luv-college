import { useAuthContext } from "@/contexts/useAuthContext";

const WelcomeUser = () => {
  const { authUser } = useAuthContext();

  return authUser !== null ? (
    <div className="font-bangers text-4xl">
      Welcome{" "}
      <span className="tracking-wider text-primary ml-2">
        {authUser.username}
      </span>
      ,
    </div>
  ) : (
    <div className="font-bangers text-4xl">Welcome, Guest!</div>
  );
};

export default WelcomeUser;
