import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from 'react';
import { useRouter } from "next/router";
import Swal from "sweetalert2";


const navs = [
    { title: 'Home', path: '/'},
    { title: 'Browse eyewear', path: '/browse-eyewear'},
    { title: 'List eyewear', path: '/new-listing'}
]

const Header = (props : any) => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUser = async () => {
        const rawResponse = await fetch('/api/auth/verify')    
        const response = await rawResponse.json()
        
        if(response.verified) {
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
            router.push('/login');
        }
    }

    const handleLogout = async () => {
        const rawResponse = await fetch('/api/auth/logout')
        const response = await rawResponse.json()

        if(response.success){
            setIsLoggedIn(false)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Logout successful',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                router.push('/login');
                setIsLoggedIn(false)
            })
        }
    }

    const display = () => {
        if(!isLoggedIn){
            return (
                <div>
                    <Link href="/login" 
                        className="px-5 py-2.5 font-semibold text-gray-500">Login</Link>
                    <Link href="/signup" 
                        className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                        type="button">Sign up</Link>
                </div>
            )
        }else{
            return (
                <div className="flex items-center justify-start gap-2 md:gap-8">
                    <Link href="/my-listing" 
                        className="font-semibold text-gray-500"
                        type="button">My Listing</Link>
                    <Link href="/myListing" 
                        className="font-semibold text-gray-500"
                        type="button">My Account</Link>
                    <button className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleLogout}>Logout</button>

                    {/* <div className="user">
                        <Image src="https://ui-avatars.com/api/?length=1&name=robert&background=6A983C&bold=true&rounded=true&color=ffffff"
                            width={42}
                            height={42}
                            alt="Profile pic" />
                    </div> */}
                </div>
            )
        }
    }

    useEffect(() => {
        checkUser()
    })

    return (
        <header className="container mx-auto flex items-center border-b border-gray-100 px-6 py-2 h-24">
            <div className="w-full">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/ecovision.svg" 
                                alt="branding logo" 
                                width={188} 
                                height={72} />
                        </Link>
                        <div className="grow">
                            <div className="flex items-center justify-start gap-2 md:gap-8">
                                {navs.map((item, index) => {
                                    return (
                                        <Link href={item.path} 
                                            key={index} 
                                            className="font-semibold text-gray-500">{item.title}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {display()}
                    </div>
                </nav>    
            </div>
        </header>
    )
}

// export const getServerSideProps = (req: NextRequest, res: NextRequest) => {
//     getCookie('test');
  
//     return { props: {} };
// };

export default Header