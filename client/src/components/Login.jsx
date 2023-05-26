import React from 'react';
import { Button } from '@mui/material';

export default function Login() {

    // const LOGIN_URI = 'http://localhost:8888/login';
    let backendURL = 'https://spotify-app-server.onrender.com';

    const LOGIN_URI = `${backendURL}/login`;

  return (
    <div className="min-h-screen bg-[#000] flex flex-col justify-center items-center">
        <h1 className='py-12 text-3xl text-white font-gotham font-semibold'>Connect Your Spotify Account</h1>
        <button className='h-1 w-44 rounded-full text-white font-medium bg-[#1DB954] p-8 flex items-center justify-center text-lg shadow-md shadow-[#7E7E7E] hover:bg-[#1ED760]'>
          <a href={LOGIN_URI} className='hover:shadow-2xl hover: shadow-inner'>Log In</a>
        </button>
    </div>
  )
}
