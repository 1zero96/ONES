import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import logo from "../assets/logo.svg";
import { useEffect } from "react";

export default function Navbar() {
  const [isCheck, setCheck] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout } = useAuthContext();
  const handleToggleMenu = () => {
    setCheck((e) => !e);
  };
  const handleDarkMode = (e) => {
    setDarkMode(!darkMode);
    localStorage.theme = !darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (localStorage.theme === "light") {
      setDarkMode(false);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <header className="bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-10 h-12 dark:bg-black dark:text-white">
      <nav className="flex justify-between items-center w-[92%] max-w-screen-2xl mx-auto px-2.5">
        <button className="text-3xl cursor-pointer md:hidden" onClick={handleToggleMenu}>
          {isCheck ? <MdClose /> : <MdMenu />}
        </button>
        <div>
          <Link to="/">
            <img className="w-16 h-12 dark:invert" src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className={
            isCheck
              ? "md:static absolute bg-gray-300 opacity-80 md:opacity-100 md:bg-white md:min-h-fit min-h-[77vw]  left-0 md:w-auto w-full flex items-center px-5 top-12 shrink-0 dark:bg-black dark:text-white"
              : "md:static absolute hidden bg-white md:min-h-fit min-h-[50vh] left-0 md:w-auto w-full items-center px-5 top-[-100%] shrink-0 md:block dark:bg-black dark:text-white"
          }
        >
          <ul className="flex md:flex-row flex-col md:item-center md:gap-[4vw] gap-8">
            <li className="hover:underline hover:underline-offset-4 md:hover:no-underline">
              <Link to="/products" className="hover:text-gray-500" onClick={handleToggleMenu}>
                PRODUCTS
              </Link>
            </li>
            <li className="hover:underline hover:underline-offset-4 md:hover:no-underline">
              <Link to="/collection" className="hover:text-gray-500" onClick={handleToggleMenu}>
                COLLECTION
              </Link>
            </li>
            <li className="hover:underline hover:underline-offset-4 md:hover:no-underline">
              <Link to="/notice" className="hover:text-gray-500" onClick={handleToggleMenu}>
                NOTICE
              </Link>
            </li>
            <li className="hover:underline hover:underline-offset-4 md:hover:no-underline">
              <Link to="/about" className="hover:text-gray-500" onClick={handleToggleMenu}>
                ABOUT
              </Link>
            </li>
            <li className="hover:underline hover:underline-offset-4 md:hover:no-underline">
              <Link to="/" className="hover:text-gray-500">
                INSTAGRAM
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          {user && (
            <Link to="/profile">
              <User user={user} />
            </Link>
          )}
          {!user && (
            <Link to="/login">
              <Button text={"LOGIN"}></Button>
            </Link>
          )}
          {user && <Button text={"LOGOUT"} onClick={logout}></Button>}

          {user && (
            <Link to="/carts">
              <CartStatus />
            </Link>
          )}

          {user && user.isAdmin && (
            <Link to="/products/new">
              <BsCartPlus className="text-xl" />
            </Link>
          )}

          {darkMode ? <IoSunnyOutline size={24} onClick={handleDarkMode} /> : <IoMoonSharp size={24} onClick={handleDarkMode} />}
        </div>
      </nav>
    </header>
  );
}
