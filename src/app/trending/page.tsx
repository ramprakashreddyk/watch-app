"use client"
import axios from 'axios'
import React, { CSSProperties, useState } from 'react'
import { useEffect } from "react"
import { AiFillFire } from "react-icons/ai"
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Link from 'next/link'
import {SyncLoader} from "react-spinners"
const TrendingPage = () => {
    const [apiData, setApiData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    console.log(apiData);
    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const response = await axios.get("https://apis.ccbp.in/videos/trending", {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`,
                    },
                });
                console.log(response.data);
                setApiData(response.data)
                setIsLoading(false);
                return response.data;
            }
            catch (error) {
                setIsLoading(false);
            }
        }
        fetchTrendingData();
    }, [])
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
            <SyncLoader
                color="#361AE3"
                loading={true}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        );
    }
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className='bg-black ml-[16.66667%] flex justify-start items-center pl-[35px] gap-3 h-[90px] mt-[70px]'>
                <AiFillFire className="text-red-700 w-[30px] h-[30px]" />
                <h1 className='text-white text-3xl font-semibold'>Trending</h1>
            </div>
            <div className='ml-[16.66667%]'>
                {apiData?.videos?.map((each: any,index:number) => {
                    return (
                        <Link href={`/video/${each.id}`} key={index} className="flex items-center space-x-4 bg-gray-900 p-4">
                            <img src={each.thumbnail_url} alt="Thumbnail" className="w-1/4 h-auto" />
                            <div className="flex-1">
                                <h1 className="text-lg font-semibold text-gray-200">{each.title}</h1>
                                <p className="text-gray-400">{each.channel.name}</p>
                                <p className="text-gray-400">{each.view_count}</p>
                            </div>
                            <p className="text-gray-400">{each.published_at}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
export default TrendingPage;