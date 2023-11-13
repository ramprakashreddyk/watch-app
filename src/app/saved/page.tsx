"use client"
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { AiFillFire } from 'react-icons/ai';
const SavedVideos = () => {
    if (typeof window !== 'undefined') {
        const savedVideosString = localStorage.getItem("savedVideos");
        try {
            var savedVideo = savedVideosString ? JSON.parse(savedVideosString) : [];
        } catch (error) {
            console.error("Error parsing savedVideos:", error);
            var savedVideo:any = [];
        }
    } else {
        var savedVideo:any = [];
    }
    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <Sidebar />
            <div className="bg-black ml-[16.66667%] flex justify-start items-center pl-[35px] gap-3 h-[90px] mt-[70px]">
                <AiFillFire className="text-red-700 w-[30px] h-[30px]" />
                <h1 className="text-white text-3xl font-semibold">Saved Videos</h1>
            </div>
            {savedVideo.length === 0 ? (
                <div className="ml-[16.66667%] mt-[20%] flex flex-col justify-center items-center pl-[35px] gap-3 h-[90px] text-white text-center">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" className="w-[500px] h-[400px]" />
                    <div>
                        <h1 className="text-3xl font-semibold">No saved videos found</h1>
                        <p className="text-gray-400 mt-5">You can save your videos while watching them</p>
                    </div>
                </div>
            ) : (
                <div className="ml-[16.66667%]  bg-gray-900 min-h-screen">
                    {savedVideo.map((each: any, index: number) => (
                        <div key={index}>
                            <div className="flex items-center space-x-4 bg-gray-900 p-4">
                                <img src={each.video_details.thumbnail_url} alt="Thumbnail" className="w-1/4 h-auto" />
                                <div className="flex-1">
                                    <h1 className="text-lg font-semibold text-gray-200">{each.video_details.title}</h1>
                                    <p className="text-gray-400">{each.video_details.channel.name}</p>
                                    <p className="text-gray-400">{each.video_details.view_count}</p>
                                </div>
                                <p className="text-gray-400">{each.video_details.published_at}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SavedVideos;