import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' bg-header flex h-12 w-full items-center justify-between border-b mt-0 p-3'>
      <span className='text-lg font-bold'><a href="/">EcoVison</a></span>
      <span><ul className='flex'>
        {/* <li className='p-3' ><a href="/sunglasses">Sunglasses</a></li> */}
        <li className='p-3' ><Link href={'/glasses'}>Glasses</Link></li>
        </ul></span>
      
      <span><ul className='flex'>
        <li className='p-3' ><a href="/myListing">My Listing</a></li>
        {/* <li className='p-3' ><a href="/signin">Sign in</a></li> */}
        </ul></span>
        

    </div>
  )
}

export default Navbar