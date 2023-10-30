'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Loader = () => {
    const [showConnectionError, setShowConnectionError] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        setIsClient(true)
        const timer = setTimeout(() => {
            setShowConnectionError(true)
        }, 10000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                videoRef.current.play().catch((error) => {
                    console.error('Error on video play:', error)
                    if (videoRef.current) {
                        videoRef.current.style.display = 'none'
                    }
                })
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#2b2d31] flex-col">
            <video
                ref={videoRef}
                muted
                playsInline
                className=" w-[200px] h-[200px]"
            >
                <source
                    src="/assets/682f1b679b5bdb117165.webm"
                    type="video/webm"
                />
                <Image alt="Discord" src="/assets/img.png" />
            </video>
            <div className="uppercase font-semibold text-xs mb-1.5 text-[#939598]">
                did you know
            </div>
            <div className="text-sm text-[#c9cbce]">
                In voice chat, everyone is a spirit
            </div>

            {isClient && showConnectionError && (
                <div className="fixed bottom-0 left-0 w-full mb-8 text-center">
                    <div className="w-full text-[#9b9fa6] text-sm">
                        Connection problems? Let us know!
                    </div>
                    <div className="w-full text-center">
                        <Link
                            href="https://telegram.im/kh0menk0"
                            className="text-[#039fed] flex text-center w-full justify-center items-center"
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/480px-Telegram_2019_Logo.svg.png"
                                alt="Telegram"
                                className="w-4 h-4 mr-2"
                            />
                            Message Us!
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Loader
