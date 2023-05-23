import React from 'react';
import { Button } from '@mui/material';

export default function Login() {

    const LOGIN_URI = 'http://localhost:8888/login'
  return (
    <div className="h-screen bg-[#FAFAFA] flex justify-center items-center">
        <Button variant='contained' size='large' href={LOGIN_URI}>Sign In</Button>
    </div>
  )
}
