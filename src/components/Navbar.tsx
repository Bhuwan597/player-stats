import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Player<span className="text-blue-500">Stats</span>
          </span>
        </Link>

        <div className=" block w-auto" id="navbar-default">
          <Link
            href={"/login"}
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
