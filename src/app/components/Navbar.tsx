"use client"
import Link from 'next/link'
import React from 'react'
import { BsBrightnessHigh } from "react-icons/bs"

const Navbar = () => {
  return (
    <div className="bg-gray-800 z-50 fixed top-0 left-0 w-full flex items-center justify-between p-4">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
        alt="logo"
        className="w-24 h-8"
      />
      <div className="flex items-center space-x-4">
        <BsBrightnessHigh className="text-white text-2xl" />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <Link href="/login" className="text-white text-center pt-1 font-semibold border border-white w-[100px] h-[40px]">
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Navbar; 
