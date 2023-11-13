"use client"
import React, { CSSProperties } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { RxCross2 } from "react-icons/rx"
import { useState } from "react"
import { useEffect } from 'react'
import { getHomeData } from '../../redux/features/auth-slice'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { SyncLoader } from 'react-spinners'

const Homepage = () => {
  const dispatch = useDispatch()
  const { homeData, isLoading } = useSelector((state: any) => state.auth)
  const [cross, setCross] = useState(true);
  const [value, setValue] = useState("");
  const handleCross = () => {
    setCross(false)
  }
  useEffect(() => {
    dispatch(getHomeData())
  }, [])
  const handleValue = (e: any) => {
    setValue(e.target.value)
  }
  const filterDetails = homeData?.videos?.filter((each: any) => {
    return (
      each.title.includes(value)
    )
  });
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: 'translateX(-50%, -50%)'
  };
  if (isLoading) {
    return (
      <div>
        <Navbar /> 
        <Sidebar />
        <SyncLoader
          color="#361AE3"
          loading={true}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className=' bg-gray-900 min-h-screen gap-2 pt-[75px] ml-[16.666667%] '>
        <div className={cross ? "bg-image pt-4 relative" : "hidden"}>
          <div className="p-4">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="Nxt Watch Logo"
            />
            <h1 className="text-2xl font-semibold mt-4">
              Buy Nxt Watch premium prepaid plans with UPI
            </h1>
            <button className="mt-7 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition duration-300">
              GET IT NOW
            </button>
            <div className='absolute top-8 cursor-pointer right-5'>
              <RxCross2 size={25} onClick={handleCross} />
            </div>
          </div>
        </div>
        <div className="relative mt-5 ml-5 w-[500px] bg-gray-200 p-2 rounded-full">
          <input
            type="search"
            placeholder="Search..."
            value={value}
            className="bg-gray-200 p-2 pr-10 rounded-full w-full focus:outline-none"
            onChange={(e) => { handleValue(e) }}
          />
          <div className="absolute right-2 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 20l-5.5-5.5M14 10a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
        {filterDetails?.length == 0 ?
          <div className="flex flex-col  items-center justify-center h-screen">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" className="w-[550px] h-[400px]" alt="No search results image" />
            <h1 className="text-white text-2xl mt-4">No search results found</h1>
            <p className="text-white text-sm mt-2">Try different keywords or remove search filter</p>
            <button className="bg-violet-500 text-white border rounded-md font-semibold px-4 py-2 mt-4">Retry</button>
          </div>
          :
          <div className='grid grid-cols-3'>
            {filterDetails?.map((each: any, index: number) => {
              return (
                <Link href={`/video/${each.id}`} key={index} className="bg-gray-800 cursor-pointer flex flex-col justify-start items-start rounded-lg shadow-lg  m-2">
                  <img
                    src={each.thumbnail_url}
                    alt="Video Thumbnail"
                    className="rounded-lg mb-2 w-full h-[250px]"
                  />
                  <div className="flex items-start space-x-2">
                    <img
                      src={each.channel.profile_image_url}
                      alt="Channel Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h1 className="text-lg text-gray-200 w-[250px] font-semibold">{each.title}</h1>
                      <h3 className="text-gray-400">{each.channel.name}</h3>
                    </div>
                  </div>
                  <div className='flex gap-3 ml-10'>
                    <p className="text-gray-400">{each.view_count} views</p>
                    <p className="text-gray-400">{each.published_at}</p>
                  </div>
                </Link>

              )
            })}
          </div>}
      </div>
    </div>
  )
}
export default Homepage;
