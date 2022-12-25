import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// * Custom components
import Layout from '../components/Layouts/Layout'
import Input from '../components/form-inputs/BaseInput'
import axios from 'axios'
import Header from '../components/Layouts/Header'

type FormInputs = {
    name: string,
    email: string,
    password: string
}

const Signup = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const signupSubmit = async (data : FormInputs) => {
        const { name, email, password } = data

        const response = await axios.post('/api/auth/signup', { name, email, password })
        
        if(!response.data.success){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error',
                text: 'Failed to register your account',
                showConfirmButton: false,
                timer: 3000
            })
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            router.push('/my-listing')
        })

        
    }

    return (
        <Layout>
            <div className='flex items-center justify-center p-5'>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-3 items-center mb-8">
                        <h1 className='text-3xl font-semibold'>Create an account</h1>
                        <p className="text-gray-500">Sign up to start buying and selling</p>
                    </div>

                    <form className="form-group" 
                        method="POST"
                        onSubmit={handleSubmit(signupSubmit)}>
                        <Input for="name" 
                            type="text" 
                            placeholder="Enter your name"
                            required="true"
                            validate={{...register('name', { required: 'This is a required field.' })}} 
                            error={errors.name} />

                        <Input for="email" 
                            type="email" 
                            placeholder="Enter your email"
                            required="true"
                            validate={{...register('email', { required: 'This is a required field.' })}} 
                            error={errors.email} />
                            
                        <Input for="password" 
                            type="password" 
                            placeholder="Create your password"
                            required="true"
                            minLength="8"
                            ruleLabel="Must be at least 8 characters."
                            validate={{...register('password', { 
                                required: 'This is a required field.',
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}} 
                            error={errors.password} />

                        <div className="login-options mb-6">
                            <button type="submit" 
                                className="w-full bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150 mb-4">
                                Create account
                            </button>
                            <button type="button"
                                className="w-full bg-white border border-gray-300 px-5 py-2.5 rounded-lg hover:shadow-lg ease-linear transition-all duration-150">
                                <div className="flex items-center justify-center">
                                    <Image src="/google.svg" 
                                        alt="Google" 
                                        width={24} 
                                        height={24} />
                                    <span className='font-semibold ml-2 text-gray-700'>Sign up with Google</span>
                                </div>
                            </button>
                        </div>

                        <div className="text-center">
                            <p className='text-sm text-gray-500'>
                                <span>Already have an account? </span>
                                <Link href="/login" className='text-primary font-semibold'>Log in</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Signup