import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function RecentListing () {
    const [data, setData] = React.useState([])
    useEffect(() => {
        fetch('https://ecovision-backend.vercel.app/api/listings')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div className='flex-col pt-8 pb-6 px-10'>
            <div className="flex items-center justify-between">
                <h1 className="my-12 text-5xl font-bold text-black md:text-3xl">Recently Listed</h1>
                <Link href='/browse-eyewear' className="text-sm text-[#6A983C] hover:text-black">View All</Link>
            </div>

            <div className="grid grid-cols-4 gap-5">
                {data.map((listing : any, index: number) => {
                    if(index < 4){
                        return (
                            <Link className="flex flex-col items-center"
                                href={`/view-listing?id=${listing.id}`}
                                key={index}>
                                <img src={listing.photo} 
                                    alt={listing.title} 
                                    className="w-full"
                                    width={250} 
                                    height={250} />
                                <div className='flex flex-col items-center'>
                                    <h3 className="mt-4 text-sm font-bold text-black">{listing.title}</h3>
                                    <p className='text-ellipsis overflow-hidden text-center'>{listing.description}</p>
                                    <p className="font-bold text-center">${listing.price}</p>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default RecentListing

