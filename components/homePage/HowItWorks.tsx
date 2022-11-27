import React from 'react'
import Image from 'next/image'

const HowItWorks = () => {
  return (
    <div><Image className='w-100% h-60 object-cover' src="/How it works.png" alt="Vercel Logo" width={800} height={50} /></div>
  )
}

export default HowItWorks