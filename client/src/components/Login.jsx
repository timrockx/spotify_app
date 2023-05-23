import React from 'react';
import { Button } from '@mui/material';

export default function Login() {

    const LOGIN_URI = 'http://localhost:8888/login';

  return (
    <div className="h-screen bg-[#FAFAFA] flex flex-col justify-center items-center">
        <h1 className='py-5 text-2xl font-gotham'>Sign In With Spotify</h1>
        <Button variant='contained' size='large' href={LOGIN_URI}>Log In</Button>
    </div>
  )
}
