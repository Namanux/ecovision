import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// * Custom components
import Layout from '../components/Layouts/Layout'
import Input from '../components/form-inputs/BaseInput'
import Checkbox from '../components/form-inputs/BaseCheckbox'

import { validateEmail } from '../helpers/util'
import Header from '../components/Layouts/Header'

type FormInputs = {
    email: string,
    password: string,
    remember: boolean
}

const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>({
        defaultValues: { // * set default values
            email: "",
            password: "",
            remember: false
        }
    });

    const loginSubmit = async (data : FormInputs) => {
        const { email, password, remember } = data
        const response = await axios.post('/api/auth/login', data);
        if(response.data.success){

            router.push('/my-listing')
        }
    }

    return (  
        <Layout>
            <div className='flex items-center justify-center h-screen'>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-3 items-center mb-8">
                        <h1 className='text-3xl font-semibold'>Log in to your account</h1>
                        <p className="text-gray-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form className="form-group" 
                        onSubmit={handleSubmit(loginSubmit)}>

                        <Input for="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            validate={{...register('email', { required: 'This is a required field.' })}} 
                            error={errors.email} />
                            
                        <Input for="password" 
                            type="password" 
                            placeholder="Enter your password"
                            validate={{...register('password', { required: 'This is a required field.' })}} 
                            error={errors.password} />
                        
                        <div className="flex justify-between">
                            <Checkbox for="remember" 
                                label="Remember for 30 days" />

                            <a href="/forgot-password"
                                className='text-link text-primary text-sm font-semibold'>Forgot Password</a>
                        </div>

                        <div className="login-options mb-6">
                            <button type="submit" 
                                className="w-full bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150 mb-4">Sign in</button>
                            <button type="button"
                                className="w-full bg-white border border-gray-300 px-5 py-2.5 rounded-lg hover:shadow-lg ease-linear transition-all duration-150">
                                <div className="flex items-center justify-center">
                                    <Image src="/google.svg" 
                                        alt="Google" 
                                        width={24} 
                                        height={24} />
                                    <span className='font-semibold ml-2 text-gray-700'>Sign in with Google</span>
                                </div>
                            </button>
                        </div>

                        <div className="text-center">
                            <p className='text-sm text-gray-500'>
                                <span>Don&apos;t have an account yet? </span>
                                <Link href="/signup" className='text-primary font-semibold'>Sign up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}



export default Login

