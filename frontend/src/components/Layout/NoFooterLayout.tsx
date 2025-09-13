import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
const NoFooterLayout = () => {
  const [theme, setTheme] = useState("light-theme");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme") || "light-theme";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="" data-theme={theme}>
      <Header
        theme={theme}
        onThemeChange={handleThemeChange}
        showHeader={showHeader}
      />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default NoFooterLayout;
