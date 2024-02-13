"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    };
    fetchProviders();
  }, []);
  const { data: session } = useSession();
  console.log("TEST", providers);
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
        {session ? (
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
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="flex md:hidden">
        {session ? (
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
              <div className="z-10 absolute top-14 right-7 shadow-xl font-normal bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li>
                    <Link
                      href="/profile"
                      onClick={() => setToggleDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="create-prompt"
                      onClick={() => setToggleDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Create Prompt
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
