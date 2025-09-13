import { NavLogoDark, NavLogoLight } from "@/constants/images";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";

const MobileDrawer = ({ theme }: { theme: string }) => {
  const [navactive, setNavactive] = useState(false);
  useEffect(() => {
    if (navactive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navactive]);

  return (
    <>
      <div
        onClick={() => setNavactive(true)}
        className="btn btn-ghost lg:hidden "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <div
        className={`h-screen w-screen  bg-base-100 fixed top-0 z-[10] transition-all duration-300 ease-in-out ${
          navactive ? "right-0" : "right-[100%] "
        }`}
      >
        <div className="navbar bg-base-100 fixed w-full z-[99]  shadow-md px-5   ">
          <div className="navbar-start gap-2">
            <Link to="/" aria-label="Home">
              <img
                src={
                  theme === "dark-theme" || theme === "synthwave"
                    ? NavLogoDark
                    : NavLogoLight
                }
                alt="I LUV COLLEGE Navigation Logo"
                width="100%"
                title="I LUV COLLEGE"
                height="auto"
                className="h-14 mq725:h-10"
              />
            </Link>
          </div>
          <div className="navbar-end gap-1">
            <div onClick={() => setNavactive(false)} className="btn btn-ghost ">
              <IoClose className="text-2xl" />
            </div>
          </div>
        </div>
        <div
          className="pt-20 px-5 "
          onClick={() => {
            setNavactive(false);
          }}
        >
          <ul className="menu px-1 font-semibold flex flex-col gap-3 mt-12  ">
            <HeaderMenu mobile={true} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
