import { Link } from "react-router-dom";
import { FaUniversity, FaHome } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

const HeaderMenu = ({ mobile }: { mobile: boolean }) => {
  const menuItemClass = `flex items-center ml-1 ${mobile ? "text-lg" : ""}`;

  return (
    <>
      <li>
        <Link to="/" className={menuItemClass}>
          <FaHome className="h-4 w-4 mr-1" aria-label="Home Icon" />
          Home
        </Link>
      </li>
      <li>
        <Link to="/colleges" className={menuItemClass}>
          <FaUniversity className="mr-1" aria-label="University Icon" />
          Colleges
        </Link>
      </li>
      <li>
        <Link
          to="https://insigh.to/b/i-luv-college"
          className={menuItemClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlinePlusCircle
            className="mr-1"
            aria-label="Suggest Feature Icon"
          />
          Suggest a Feature
        </Link>
      </li>
    </>
  );
};

export default HeaderMenu;
