import React from 'react'
import Image from "next/image"
import HeroImage from "../public/HeroImage.png"
import Link from "next/link"

function HeroImgScroller () {
    return (
        <div className="text-center bg-white h-full">
            <div className='flex-col items-center justify center py-5 my-5'>
                <h1 className="my-5 text-5xl font-bold text-black md:text-7xl">Buy, Sell, Recycle Your Eyewear</h1>
            </div>

            <div>
                <p className="text-base text-black md:text-xl">
                    Start selling your new and used eyewears easily.     
                    It’s good for you and for the environment.
                </p>
                <div className='m-12 flex items-start justify-center gap-5 text-center'>
                    <button className='bg-white border border-gray-300 px-5 py-2.5 rounded-lg hover:shadow-lg ease-linear transition-all duration-150'>
                        Log In
                    </button>

                    <Link className='bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150 mb-4'
                        href="signup">
                        Sign Up
                    </Link>
                </div>
            </div>
            <div>
                <Image src={"/HeroImage.png"} alt="heroimage" width={1200} height={800} />   
            </div>         
          </div>
          
    )
    
}

export default HeroImgScroller