"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [localCurrentUser, setLocalCurrentUser] = useState(currentUser);

  useEffect(() => {
    setLocalCurrentUser(currentUser);
  }, [currentUser]);

  const currentUserData =
    localCurrentUser?.email !== '' &&
    localCurrentUser?.firstName !== '' &&
    localCurrentUser?.lastName !== '' &&
    localCurrentUser?.password !== '';

  const handleRemoveCurrentUser = () => {
    localStorage.removeItem('currentUser');
    router.push("/login"); // or router.push(router.asPath);
  };

  return (
    <div className="bg-gray-800 z-50 fixed top-0 left-0 w-full flex items-center justify-between p-4">
      <Link href="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
          alt="logo"
          className="w-24 h-8 cursor-pointer"
        />
      </Link>
      <div className="flex items-center space-x-4">
        {localCurrentUser === null ? (
          <Link href="/login" className="text-white text-center pt-1 font-semibold border border-white w-[100px] h-[40px]">

            Login
          </Link>
        ) : (
          <button
            onClick={() => handleRemoveCurrentUser()}
            className="text-white text-center pt-1 font-semibold border border-white w-[100px] h-[40px]"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
