
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Auth/Logout";
import ThemeBtn from "../Auth/ThemeBtn";
import { AuthContext } from "../../context/AuthApi";

function NavBar() {

  const { user } = useContext(AuthContext);

  return (
    <nav className="fixed w-full h-[9vh] flex items-center justify-between shadow-xl z-50 bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="flex items-center">
        <p className="logo text-3xl ml-16">Verbum</p>
      </div>

      <div className="ml-4 hidden sm:flex">
        <ul className="menu menu-horizontal text-md font-semibold px-1">
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/all-posts">All posts</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <ThemeBtn />

        {user ? (
          <Logout />
        ) : (
          <NavLink to="/login" className="btn btn-outline mr-16">Get Started</NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
