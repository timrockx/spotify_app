import React from 'react';
import { motion } from "framer-motion";

export default function Login() {

    // const LOGIN_URI = 'http://localhost:8888/login';
    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const LOGIN_URI = `${backendURL}/login`;

  return (
    <div className="min-h-screen bg-[#000] flex flex-col justify-center items-center pt-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3 }} 
        >
          <div className='flex flex-col justify-center items-center'>
            <h1 className='py-12 text-3xl text-white text-center font-gotham font-semibold'>Connect Your Spotify Account</h1>
            <button className='h-1 w-44 rounded-full text-white font-medium bg-[#1DB954] p-8 flex items-center justify-center text-lg shadow-md shadow-[#7E7E7E] hover:bg-[#1ED760]'>
              <a href={LOGIN_URI} className='hover:shadow-2xl hover: shadow-inner'>Log In</a>
            </button>
            <h3 className='italic text-white text-center pt-5'>* Access is currently restricted because the app is in development mode.</h3>
          </div>

        </motion.div>

    </div>
  )
}
