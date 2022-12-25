import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import Glass1 from '../public/glass1.png'
// import Glass2 from '../public/glass2.png'
// import Glass3 from '../public/glass3.png'
import Layout from '../components/Layouts/Layout'
import CardListing from '../components/CardListing'
import Link from 'next/link'
import Footer from '../components/Layouts/Footer'

const myListing = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [del, setDelete] = useState(false)

  useEffect(() => {
    console.log('components mounted')
    document.title = "My Listings | EcoVision"

    setLoading(true)

    fetch('/api/auth/verify')    
     .then(response => response.json())
     .then(data => {
       fetch(`https://ecovision-backend.vercel.app/api/listings/me/${data.decode.uid}`)
        .then(res => res.json())
        .then(listings => {
          setListings(listings)
          setLoading(false)
        })
    }).catch(err => console.log(err))
  }, [])

  if(loading){
    <div className='flex flex-col items-center justify-center h-screen'>
        <p className='mb-4'>Loading...</p>
    </div>
  }

  if(listings.length <= 0) {
    return (
      <Layout>
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='mb-4'>No record found...</p>
          <Link href="/new-listing" 
            className='bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150 mb-4'
            type='button'>Add a record</Link>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="pl-8 my-5 text-4xl font-bold text-black md:text-4xl">My Listings</h1>
        <Link href="/new-listing" className="text-m pr-7 pb-6 text-right font-bold text-[#6A983C] hover:text-black">List an Eyewear</Link>
      </div>

      {
        listings.map((listing) => {
          return (
              <CardListing 
                setDelete={setDelete}
                key={listing.id}
                id={listing.id}
                photo={listing.photo}
                title={listing.title}
                description={listing.description}
                price={listing.price} />
          )
        })
      }

      <Footer /> 
    </Layout>
  )
}

export default myListing;