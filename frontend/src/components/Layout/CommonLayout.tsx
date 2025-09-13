import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";

const CommonLayout = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("selectedTheme") || "light-theme"
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <div data-theme={theme}>
      <Header
        theme={theme}
        onThemeChange={handleThemeChange}
        showHeader={showHeader}
      />
      <main>
        <Outlet />
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default CommonLayout;
