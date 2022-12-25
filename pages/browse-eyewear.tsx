import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Layouts/Footer";
import Layout from "../components/Layouts/Layout";

const BrowseEyewear = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://ecovision-backend.vercel.app/api/listings')
           .then((response) => response.json())
           .then((json) => {
                setData(json)
            })
    })

    return (
        <Layout>
            <h1 className="my-10 px-6 text-5xl font-bold text-black md:text-3xl text-left">Browse Eyewear</h1>
            <div className="grid grid-cols-4 px-6 gap-5 mb-20">
                {data.map((listing : any, index: number) => {
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
                })}
            </div>

            <Footer />
        </Layout>
    )
}

export default BrowseEyewear;