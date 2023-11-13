"use client"
import React, { CSSProperties, useState } from 'react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { FiSave } from "react-icons/fi"
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import YouTube from 'react-youtube'
import { SyncLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux'
import { storedSavedVideos } from '../../../../redux/features/auth-slice'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const SingleHomePage = () => {
    const { currentUser } = useSelector((state: any) => state.auth)
    console.log(typeof currentUser, "curr");
    const dispatch = useDispatch<any>();
    const opts = {
        height: "590",
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 1,
            start: 0,
            end: 0,
            loop: 0,
            fs: 0,
            modestbranding: 0,
        }
    }
    const { singleHomePage } = useParams()
    const [apiData, setApiData] = useState<any>();
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    console.log(singleHomePage)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://apis.ccbp.in/videos/${singleHomePage}`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`, // Include the JWT token in the Authorization header
                    },
                });
                console.log(response.data);
                setApiData(response.data)
                setIsLoading(false);
                return response.data;
            }
            catch (error) {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])
    let videoId: any = null;

    if (apiData && apiData.video_details && apiData.video_details.video_url) {
        videoId = new URL(apiData.video_details.video_url).searchParams.get('v');
    }
    const onReady = (event: any) => {
        event.target.pauseVideo();
    };
    const handleLikeClick = () => {
        if (!likeActive) {
            setLikeActive(true);
            setDislikeActive(false);
        } else {
            setLikeActive(false);
        }
    };
    const handleDislikeClick = () => {
        if (!dislikeActive) {
            setDislikeActive(true);
            setLikeActive(false);
        } else {
            setDislikeActive(false);
        }
    };
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
    const handleToast = () => {
        toast.error("please login")
    }

    return (
        apiData && (<div>
            <Navbar />
            <Sidebar />
            <div className="bg-gray-800 pt-24 min-h-screen max-w-full p-4 flex flex-col ml-[16.666667%]">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={onReady}
                />
                <div>
                    <div className="ml-4 mt-5 flex-1">
                        <h2 className="text-2xl text-gray-200">
                            {apiData?.video_details?.title}
                        </h2>
                        <p className="text-gray-400">
                            {apiData?.video_details?.view_count}
                        </p>
                        <p className="text-gray-400">
                            {apiData?.video_details?.published_at}
                        </p>
                        <div className="flex text-gray-300 items-center space-x-4 mt-4">
                            <AiOutlineLike
                                className={likeActive ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}
                                onClick={handleLikeClick}
                            />
                            <p className={likeActive ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}>Like</p>
                            <AiOutlineDislike
                                className={dislikeActive ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}
                                onClick={handleDislikeClick}
                            />
                            <p className={dislikeActive ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}>Dislike</p>
                            <FiSave className="cursor-pointer hover:text-blue-600" onClick={() => {
                                currentUser !== null ? dispatch(storedSavedVideos(apiData)) : handleToast()
                            }} />
                            <p className="">Save</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex text-gray-200 items-center">
                            <img
                                src={apiData?.video_details?.channel.profile_image_url}
                                alt="Channel Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg">
                                    {apiData?.video_details?.channel.name}
                                </h3>
                                <p className="text-gray-400">
                                    {apiData?.video_details?.channel.subscriber_count} Subscribers
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-200 mt-4">
                            {apiData?.video_details?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>)
    )
}
export default SingleHomePage;
