import React from 'react';
import { Link } from '@mui/material'

export default function () {
  return (
    <div className='min-h-screen bg-[#1b1b1b]'>
        <div className='h-screen flex flex-col justify-center items-center gap-4 m-auto text-white'>
            <h3 className='text-2xl text-center px-10'>Sorry, something went wrong on our end. Please login again.</h3>
            <h5 className='text-xl text-center px-10'>First time users, please reach out to <a href='mailto:timothyyinlee@gmail.com' className='hover:text-[#0085D1]'>timothyyinlee@gmail.com</a> to gain access.</h5>
            <button className='border-white border-2 rounded-full border-solid py-3 px-7 w-fit hover:bg-[#1ED760] hover:text-black hover:border-black'>
                <a className='no-underline text-lg' href='/'>
                    Log In
                </a>
            </button>
        </div>
    </div>
  )
}
