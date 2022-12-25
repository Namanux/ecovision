import Link from 'next/link'
import React from 'react'

function StartListing () {
    return (
        <div className="flex-col space-y-2 pt-8 pb-6">
            <h1 className="my-4 text-center font-bold md:text-3xl ">
                Start Listing
            </h1>
            <p>
                Join over 4,000+ users happily buying and selling eyewears with Ecovision
            </p>
            <div className='m-12 flex items-start justify-center gap-5 text-center pt-3'>
                    <button className='bg-white border border-primary px-5 py-2.5 rounded-lg hover:shadow-lg ease-linear transition-all duration-150'>
                        Learn More
                    </button>

                    <Link className='bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150 mb-4'
                        href="/signup" >Sign Up</Link>
                </div>
            
        </div>
    )
}

export default StartListing