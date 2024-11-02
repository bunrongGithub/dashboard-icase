'use client'
import Email from '@/app/components/assets/icons/Email'
import Phone from '@/app/components/assets/icons/Phone'
import React from 'react'
import Navbar from '../navbars/Navbar'
import { FaShopify } from 'react-icons/fa'

const HeadingBar = () => {
    return (
        <>
            <header className='font-heading w-full h-[44px] bg-heading-bar-bg flex justify-between items-center'>
                <div className='w-full h-full flex justify-evenly items-center'>
                    <span className='flex items-center'> <Email /> &nbsp;buunbunrong993@gmail.com</span>
                    <span className='flex items-center'><Phone /> &nbsp;&nbsp;(+855) 889162788</span>
                </div>
                <div className='w-full h-full flex justify-around items-center'>
                    <div className='h-full flex items-center'>
                        <div className='px-10'>
                            <span>English</span>
                        </div>
                        <div className='px-10'>
                            <span>USD</span>
                        </div>
                        <div className='px-10'>
                            <span>Login</span>
                        </div>
                        <div className='px-10'>
                            <span>Wishlist</span>
                        </div>
                        <div className='px-10'>
                            <FaShopify/>
                        </div>
                    </div>
                </div>
            </header>
            <Navbar/>
        </>
    )
}

export default HeadingBar