import React from 'react'
import Link from 'next/link'
import { AiFillHome } from "react-icons/ai"
import { MdOutlineTrendingUp } from "react-icons/md"
import { SiYoutubegaming } from "react-icons/si"
import { LiaSaveSolid } from "react-icons/lia"
import { usePathname } from 'next/navigation'
const Sidebar = () => {
  const path=usePathname();
  return (
    <div>
      <div className="bg-gray-800 h-screen w-2/12 fixed top-0 left-0 flex flex-col justify-between items-center p-2 text-white">
        <div className="flex flex-col mr-10 space-y-4 mt-16">
          <Link href="/" className={`flex gap-5 items-center group ${path === '/' ? 'text-red-500 ' : 'text-white '}`}>
            <AiFillHome className="text-xl group-hover:text-red-500" />
            <h3 className="group-hover:text-red-500">Home</h3>
          </Link>
          <Link href="/trending" className={`flex gap-5 items-center group ${path === '/trending' ? 'text-red-500 ' : 'text-white '}`}>
            <MdOutlineTrendingUp className="text-xl group-hover:text-red-500" />
            <h3 className="group-hover:text-red-500">Trending</h3>
          </Link>
          <Link href="/gaming"  className={`flex gap-5 items-center group ${path === '/gaming' ? 'text-red-500 ' : 'text-white '}`}>
            <SiYoutubegaming className="text-xl group-hover:text-red-500" />
            <h3 className="group-hover:text-red-500">Gaming</h3>
          </Link>
          <Link href="/saved"  className={`flex gap-5 items-center group ${path === '/saved' ? 'text-red-500 ' : 'text-white '}`}>
            <LiaSaveSolid className="text-xl group-hover:text-red-500" />
            <h3 className="group-hover:text-red-500">Saved Videos</h3>
          </Link>
        </div>
        <div className="text-white mr-5 font-semibold">
          <h1 className='mt-3'>CONTACT US</h1>
          <div className="flex justify-center space-x-2 mt-2">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" className='w-[30px] h-[30px]' alt="facebook" />
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" className='w-[30px] h-[30px]' alt="twitter" />
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" className='w-[30px] h-[30px]' alt="linkedin" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sidebar;
