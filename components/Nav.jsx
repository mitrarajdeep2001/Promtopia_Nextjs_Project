"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const isUserLoggedin = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex-center gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          alt="promptopia_logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {isUserLoggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href={"/profile"}>
              <Image
                src={"/assets/images/profile-pic.png"}
                alt="profile_pic"
                width={40}
                height={40}
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="flex md:hidden">
        {isUserLoggedin ? (
          <div className="flex flex-col">
            <Image
              src={"/assets/images/profile-pic.png"}
              alt="profile_pic"
              width={40}
              height={40}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {/* Dropdown menu */}
            {toggleDropdown && (
              <div className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;
