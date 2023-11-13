"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { SiYoutubegaming } from "react-icons/si"
import Link from 'next/link';
const GamingPage = () => {
    const [apiData, setApiData] = useState<any>();
    useEffect(() => {
        const fetchGamingData = async () => {
            try {
                const response = await axios.get("https://apis.ccbp.in/videos/gaming", {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`,
                    },
                });
                console.log(response.data);
                setApiData(response.data)   
                return response.data;
            }
            catch (error) {
            }
        }
        fetchGamingData();
    }, [])
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className='bg-black ml-[16.66667%] flex justify-start items-center pl-[35px] gap-3 h-[90px] mt-[70px]'>
                <SiYoutubegaming className="text-red-700 w-[30px] h-[30px]" />
                <h1 className='text-white text-3xl font-semibold'>Gaming</h1>
            </div>
            <div className=' bg-gray-700 flex justify-center'>
                <div className='ml-[16.66667%] p-3 grid grid-cols-3 gap-24'>
                    {apiData?.videos?.map((each: any, index: number) => {
                        return (
                            <Link href={`/video/${each.id}`} key={index} className="bg-gray-800 p-4 rounded-lg shadow-md w-64">
                                <img
                                    src={each.thumbnail_url}
                                    alt="gaming_img"
                                    className="w-full h-72 object-cover"
                                />
                                <h1 className="text-lg text-gray-200 font-semibold mt-2">{each.title}</h1>
                                <p className="text-gray-600">{each.view_count} Playing Worldwide</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default GamingPage;
